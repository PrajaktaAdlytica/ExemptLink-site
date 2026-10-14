EXEMPTLINK / THROUGH THE SEAM
Selected direction: original option 2. No atlas sequence.

Delivery
- ExemptLink-through-the-seam.mp4: 1920 x 1080, 24 fps, 12 seconds, silent H.264.
- ExemptLink-through-the-seam-still.jpg: light end-state poster.
- source/through-the-seam.blend: editable scene, exact logo geometry, animated camera, lights and evidence panel.
- source/create_intro.py: reproducible scene and animation generator for Blender 5.2.
- source/encode_intro.py: encodes rendered frames using imageio-ffmpeg.
- render-spec.json: exact encoded delivery specification and file sizes.

Sequence
0.0–2.7s: macro camera glides toward the logo seam; jade ceramic and copper edge detail.
2.7–6.0s: camera rises and orbits, revealing the complete three-region symbol.
4.3–9.9s: the synthetic evidence panel rises into view and settles as the camera levels.
9.9–12s: hold on the light brand and review composition.

Product accuracy
The logo is extruded from the existing symbol-primary.svg, not redrawn.
TX-091: Blue Mesa Supply LLC, New York.
CE-21: Blue Mesa Supply West LLC, New Jersey.
The record remains held for review. Reviewer decides. Synthetic demo only.
No invented invoice amounts, expiry rules, automatic approval or operating claims.

Website behavior
The film appears above the homepage hero, plays once muted, and stays on its final frame.
Pause, replay and skip are available. Offscreen and background playback pauses.
Reduced-motion and data-saver visitors get a static poster with explicit play available.
The global footer motion control also pauses the introduction.
A 1280 x 720 rendition is used on narrow screens. Both files are fast-start H.264.

Reproduction from the original workspace
/Applications/Blender.app/Contents/MacOS/Blender -b --python outputs/ExemptLink-intro/source/create_intro.py -- render
python outputs/ExemptLink-intro/source/encode_intro.py
Python encoder dependencies: imageio-ffmpeg 0.6.0, Pillow 12.3.0.
The script expects the existing outputs/ExemptLink-brand-kit sibling for source logo and fonts.
Rendered intermediate PNG frames are in work/intro-render/frames, not in the delivery bundle.
