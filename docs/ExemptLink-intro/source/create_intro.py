"""Reproducible 12-second ExemptLink film. Blender 5.2, no external add-ons."""
import bpy, math, re, sys
from pathlib import Path
from mathutils import Vector

ROOT = Path(__file__).resolve().parents[3]
KIT = ROOT / 'outputs/ExemptLink-brand-kit'
OUT = ROOT / 'outputs/ExemptLink-intro'
WORK = ROOT / 'work/intro-render'
OUT.mkdir(exist_ok=True); WORK.mkdir(exist_ok=True)
bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
scene = bpy.context.scene
scene.render.engine = 'BLENDER_EEVEE'
scene.render.resolution_x = 1920; scene.render.resolution_y = 1080
scene.render.resolution_percentage = 100
scene.eevee.taa_render_samples = 32
scene.render.fps = 24; scene.frame_start = 1; scene.frame_end = 288
scene.render.image_settings.file_format = 'PNG'
scene.render.film_transparent = False
scene.view_settings.view_transform = 'AgX'
scene.render.image_settings.color_mode = 'RGB'
scene.world.use_nodes = True
world = scene.world.node_tree.nodes.get('Background')
world.inputs['Color'].default_value = (.32,.43,.38,1)

def mat(name, color, rough=.4, metal=0):
    m=bpy.data.materials.new(name); m.diffuse_color=(*color,1); m.use_nodes=True
    p=m.node_tree.nodes.get('Principled BSDF')
    p.inputs['Base Color'].default_value=(*color,1)
    p.inputs['Roughness'].default_value=rough; p.inputs['Metallic'].default_value=metal
    return m
jade=mat('Satin jade ceramic',(.024,.105,.079),.29,.24)
dark=mat('Deep forest ceramic',(.012,.045,.034),.36,.18)
ivory=mat('Porcelain',(.86,.90,.84),.32)
ink=mat('Forest ink',(.013,.044,.035),.55)
copper=mat('Copper rim',(.51,.25,.11),.28,.62)
hold=mat('Hold surface',(.74,.51,.31),.56)
emission=ink.node_tree.nodes.new('ShaderNodeEmission'); emission.inputs['Color'].default_value=(.015,.042,.033,1)
ink.node_tree.links.new(emission.outputs[0],ink.node_tree.nodes.get('Material Output').inputs['Surface'])
seam=mat('Luminous ivory seam',(.9,.85,.65),.3)
seam.node_tree.nodes.get('Principled BSDF').inputs['Emission Color'].default_value=(1,.83,.54,1)
seam.node_tree.nodes.get('Principled BSDF').inputs['Emission Strength'].default_value=2.5
floor=mat('Studio cyclorama',(.014,.036,.029),.5,.08)
# Microtexture catches raking light without resembling stone or a landscape.
for m in [jade,dark]:
    nodes=m.node_tree.nodes; links=m.node_tree.links
    noise=nodes.new('ShaderNodeTexNoise'); noise.inputs['Scale'].default_value=165
    bump=nodes.new('ShaderNodeBump'); bump.inputs['Strength'].default_value=.16; bump.inputs['Distance'].default_value=.018
    links.new(noise.outputs['Fac'],bump.inputs['Height']); links.new(bump.outputs['Normal'],nodes.get('Principled BSDF').inputs['Normal'])

def cube(name,loc,scale,material,bevel=.04,parent=None):
    bpy.ops.mesh.primitive_cube_add(size=1,location=loc); o=bpy.context.object; o.name=name
    o.dimensions=scale; bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    o.data.materials.append(material)
    if bevel:
        b=o.modifiers.new('Soft manufactured edge','BEVEL');b.width=bevel;b.segments=4
        o.modifiers.new('Weighted normals','WEIGHTED_NORMAL')
    if parent:o.parent=parent
    return o
cube('Seam light bed',(-2.65,0,-.07),(4.67,4.46,.12),seam,.02)
svg=(KIT/'brand/symbol-primary.svg').read_text()
paths=re.findall(r'<path[^>]+d="([^"]+)"',svg)
for i,path in enumerate(paths):
    pts=[tuple(map(float,p)) for p in re.findall(r'([\d.]+),([\d.]+)',path)]
    pts=[(-2.65+(x-128)*4.6/256,(121.9-y)*4.6/256) for x,y in pts]
    n=len(pts); verts=[(x,y,z) for z in [0,.66] for x,y in pts]
    faces=[tuple(range(n-1,-1,-1)),tuple(range(n,2*n))]+[(j,(j+1)%n,(j+1)%n+n,j+n) for j in range(n)]
    mesh=bpy.data.meshes.new('Exact SVG region');mesh.from_pydata(verts,[],faces);mesh.update()
    o=bpy.data.objects.new('Jurisdiction region '+str(i+1),mesh);bpy.context.collection.objects.link(o)
    o.data.materials.append(jade if i==2 else dark);o.data.materials.append(copper)
    b=o.modifiers.new('Ceramic bevel','BEVEL');b.width=.018;b.segments=4;b.material=1
    o.modifiers.new('Weighted normals','WEIGHTED_NORMAL')

cube('Infinite studio',(0,0,-.18),(200,200,.2),floor,0)
font=bpy.data.fonts.load(str(KIT/'fonts/InstrumentSans-Regular.ttf'))
def text(name,body,loc,size,material=ink,parent=None):
    c=bpy.data.curves.new(name,'FONT');c.body=body;c.font=font;c.size=size;c.extrude=.0002;c.offset=.0018;c.space_character=1.0
    o=bpy.data.objects.new(name,c);bpy.context.collection.objects.link(o);o.location=loc;c.materials.append(material)
    if parent:o.parent=parent
    return o

panel=bpy.data.objects.new('Evidence reveal',None);bpy.context.collection.objects.link(panel)
cube('Evidence porcelain',(0,0,0),(4.7,3.6,.11),ivory,.09,panel)
text('Demo label','SYNTHETIC DEMO',(-1.96,1.30,.07),.145,parent=panel)
text('Record pair','TX-091  /  CE-21',(-1.96,.70,.07),.38,parent=panel)
cube('Review divider',(0,.4,.065),(3.92,.012,.008),copper,.002,panel)
text('Invoice label','INVOICE',(-1.96,.07,.07),.12,parent=panel)
text('Invoice buyer','Blue Mesa Supply LLC',(-1.96,-.23,.07),.19,parent=panel)
text('Invoice state','New York',(-1.96,-.50,.07),.17,parent=panel)
text('Source label','CANDIDATE SOURCE',(.22,.07,.07),.12,parent=panel)
text('Source buyer','Blue Mesa Supply West LLC',(.22,-.23,.07),.153,parent=panel)
text('Source state','New Jersey',(.22,-.50,.07),.17,parent=panel)
cube('Review status',(-.95,-1.12,.075),(2.05,.47,.015),hold,.065,panel)
text('Review hold','Held for review',(-1.80,-1.18,.09),.20,parent=panel)
text('Human boundary','Reviewer decides',(.30,-1.18,.07),.17,parent=panel)
for f,loc,rot,scale in [(1,(2.8,.25,-2.5),65,.01),(104,(2.8,.25,-2.5),65,.01),(160,(2.5,.25,1.6),48,1),(236,(2.8,.25,.1),0,1),(288,(2.8,.25,.1),0,1)]:
    panel.location=loc;panel.rotation_euler=(math.radians(rot),0,0);panel.scale=(scale,)*3
    panel.keyframe_insert('location',frame=f);panel.keyframe_insert('rotation_euler',frame=f);panel.keyframe_insert('scale',frame=f)
brand=text('ExemptLink wordmark','ExemptLink',(-4.95,-2.9,.03),.58)
caption=text('Human authority','A source. A jurisdiction. A human review.',(-4.95,-3.34,.03),.19)
for o in [brand,caption]:
    for f,s in [(1,.001),(176,.001),(225,1),(288,1)]:o.scale=(s,)*3;o.keyframe_insert('scale',frame=f)

def light(name,loc,energy,size,color,target):
    bpy.ops.object.light_add(type='AREA',location=loc);o=bpy.context.object;o.name=name;o.data.energy=energy;o.data.shape='DISK';o.data.size=size;o.data.color=color
    o.rotation_euler=(Vector(target)-o.location).to_track_quat('-Z','Y').to_euler();return o
key=light('Broad softbox',(-4,-1,9),1100,8,(.85,1,.92),(-2,0,0))
rim=light('Copper edge light',(2,4,4),1500,5,(1,.64,.34),(-2,0,.4))
fill=light('Ivory fill',(3,-5,7),80,6,(1,.96,.86),(1,0,0))
for f,e in [(1,80),(72,180),(168,650),(230,900),(288,900)]:fill.data.energy=e;fill.data.keyframe_insert('energy',frame=f)
for f,c in [(1,(.014,.036,.029,1)),(84,(.014,.036,.029,1)),(206,(.65,.75,.68,1)),(250,(.79,.84,.77,1)),(288,(.79,.84,.77,1))]:
    p=floor.node_tree.nodes.get('Principled BSDF').inputs['Base Color'];p.default_value=c;p.keyframe_insert('default_value',frame=f)
for f,v in [(1,.08),(84,.1),(200,.3),(288,.3)]:world.inputs['Strength'].default_value=v;world.inputs['Strength'].keyframe_insert('default_value',frame=f)

bpy.ops.object.camera_add();cam=bpy.context.object;cam.name='Seam camera';scene.camera=cam
focus=bpy.data.objects.new('Camera focus',None);bpy.context.collection.objects.link(focus)
cam.data.dof.use_dof=True;cam.data.dof.focus_object=focus;cam.data.dof.aperture_blades=8
for f,pos,target,lens,aperture in [
    (1,(-2.8,-2.9,1.12),(-2.65,-.03,.48),52,2.2),
    (65,(-2.66,-1.74,1.16),(-2.55,.20,.49),48,2.8),
    (145,(3.7,-8.5,10.8),(-.1,0,.6),40,5.6),
    (238,(.05,-.7,16.0),(.05,-.55,.0),45,8),
    (288,(.05,-.7,16.0),(.05,-.55,.0),45,8)]:
    cam.location=pos;cam.rotation_euler=(Vector(target)-cam.location).to_track_quat('-Z','Y').to_euler()
    cam.data.lens=lens;cam.data.dof.aperture_fstop=aperture;focus.location=target
    cam.keyframe_insert('location',frame=f);cam.keyframe_insert('rotation_euler',frame=f)
    cam.data.keyframe_insert('lens',frame=f);cam.data.dof.keyframe_insert('aperture_fstop',frame=f);focus.keyframe_insert('location',frame=f)

scene.render.filepath=str(OUT/'ExemptLink-through-the-seam.mp4')
bpy.ops.file.pack_all()
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'source/through-the-seam.blend'))
args=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
if 'preview' in args:
    scene.render.resolution_percentage=65
    for f in [1,90,160,260]:
        scene.frame_set(f);scene.render.filepath=str(WORK/f'frame-{f}.png');bpy.ops.render.render(write_still=True)
elif 'render' in args:
    scene.render.image_settings.file_format='PNG'
    scene.frame_end=238
    scene.render.filepath=str(WORK/'frames/frame-')
    (WORK/'frames').mkdir(exist_ok=True)
    bpy.ops.render.render(animation=True)
