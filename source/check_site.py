from pathlib import Path
from html.parser import HTMLParser
import json,re,xml.etree.ElementTree as ET
SITE=Path(__file__).resolve().parents[1];ROOT=SITE/'dist'
class Page(HTMLParser):
 def __init__(self):super().__init__();self.ids=[];self.refs=[];self.h1=0;self.in_fixture=False;self.fixture=''
 def handle_starttag(self,t,a):
  d=dict(a)
  if 'id' in d:self.ids.append(d['id'])
  if t=='h1':self.h1+=1
  if t in ['a','img','script','link']:
   for key in ['href','src']:
    if key in d:self.refs.append(d[key])
  if t=='script' and d.get('id')=='demo-fixtures':self.in_fixture=True
 def handle_endtag(self,t):
  if t=='script':self.in_fixture=False
 def handle_data(self,data):
  if self.in_fixture:self.fixture+=data
errors=[];pages=list(ROOT.rglob('*.html'));svg_count=0
for path in pages:
 p=Page();p.feed(path.read_text())
 if len(set(p.ids))!=len(p.ids):errors.append(str(path)+' duplicate IDs')
 if p.h1!=1:errors.append(str(path)+' H1 count differs from one')
 for ref in p.refs:
  if not ref or ref.startswith(('http:','https:','mailto:','data:')):continue
  if ref.startswith('#'):
   if ref[1:] not in p.ids:errors.append(str(path)+' missing anchor '+ref)
  elif ref.startswith('/'):
   target=ROOT/ref.split('?')[0].split('#')[0].lstrip('/')
   if not target.is_file() and not (target/'index.html').is_file():errors.append(str(path)+' missing route/asset '+ref)
 if p.fixture:
  rows=json.loads(p.fixture)
  if len(rows)!=10 or len({r['id'] for r in rows})!=10:errors.append(str(path)+' sample count/unique IDs invalid')
  if sum(r['amount'] for r in rows)!=1600000:errors.append(str(path)+' sample control total invalid')
  states={s:sum(r['state']==s for r in rows) for s in ['Held','Pending','Completed','Rejected','Approved']}
  if states!={'Held':3,'Pending':3,'Completed':2,'Rejected':1,'Approved':1}:errors.append(str(path)+' initial fixture counts invalid')
for path in ROOT.rglob('*.svg'):
 svg_count+=1
 try:ET.parse(path)
 except Exception as e:errors.append(str(path)+' SVG parse '+str(e))
for path in ROOT.rglob('*.css'):
 for ref in re.findall(r'url\([\'\"]?([^\)\'\"]+)',path.read_text()):
  if not ref.startswith('data:') and not (path.parent/ref).is_file():errors.append(str(path)+' missing CSS asset '+ref)
manifest=json.loads((SITE/'route-manifest.json').read_text())
if len(manifest)!=30 or len({r['route'] for r in manifest})!=30:errors.append('Route manifest coverage invalid')
result={'html_files':len(pages),'SVG_files':svg_count,'IA_routes':len(manifest),'fixture_rows':10,'control_total_minor':1600000,'errors':errors}
(SITE/'qa/static-checks.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result))
if errors:raise SystemExit(1)
