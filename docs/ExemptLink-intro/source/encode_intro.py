"""Encode the Blender frames after rendering: pip install imageio-ffmpeg Pillow."""
from pathlib import Path
import subprocess, json
import imageio_ffmpeg
from PIL import Image

ROOT=Path(__file__).resolve().parents[3]
OUT=ROOT/'outputs/ExemptLink-intro'
FRAMES=ROOT/'work/intro-render/frames'
SITE=ROOT/'outputs/ExemptLink-website/dist/assets/film'
SITE.mkdir(parents=True,exist_ok=True)
ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
assert all((FRAMES/f'frame-{i:04d}.png').exists() for i in range(1,239)), 'Render all 238 frames first.'
for width,name,crf in [(1920,'through-the-seam-1080.mp4','18'),(1280,'through-the-seam-720.mp4','21')]:
    subprocess.run([ffmpeg,'-y','-framerate','24','-i',str(FRAMES/'frame-%04d.png'),
      '-vf',f'scale={width}:-2,tpad=stop_mode=clone:stop_duration=2.084',
      '-frames:v','288','-c:v','libx264','-preset','slow','-crf',crf,'-pix_fmt','yuv420p',
      '-movflags','+faststart','-an',str(SITE/name)],check=True)
for n,f in [('poster.jpg',1),('still.jpg',238)]:
    Image.open(FRAMES/f'frame-{f:04d}.png').convert('RGB').save(SITE/n,quality=92,optimize=True)
import shutil
shutil.copy2(SITE/'through-the-seam-1080.mp4',OUT/'ExemptLink-through-the-seam.mp4')
shutil.copy2(SITE/'still.jpg',OUT/'ExemptLink-through-the-seam-still.jpg')
report={'duration_seconds':12,'frames':288,'fps':24,'resolution':[1920,1080],
        'codec':'H.264','pixel_format':'yuv420p','audio':False,
        'files':{p.name:p.stat().st_size for p in SITE.iterdir()}}
(OUT/'render-spec.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report))
