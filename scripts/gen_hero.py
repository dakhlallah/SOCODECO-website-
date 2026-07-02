#!/usr/bin/env python3
import json, base64, sys, urllib.request

KEY = "AIzaSyCpw8Bp8oL0Ujjnsh5cWUXkgWWabR0zbhs"
OUT = sys.argv[1]

PROMPT = """Editorial architectural photography, ultra-high-resolution real photograph of a luxury 20-story high-rise tower under construction at golden hour in Kinshasa, Democratic Republic of Congo. The upper third is exposed reinforced concrete frame with formwork and rebar; the lower two thirds are already clad in floor-to-ceiling glass curtain wall panels reflecting warm amber sunset light, with a glass panel being hoisted into place on a mid floor. A tall yellow tower crane rises beside the building, its jib crossing the sky; a second crane stands further back. Scaffolding with fine safety netting wraps several mid floors. Small figures of construction workers in orange hi-vis vests and helmets stand on slab edges and on the dusty ground. A concrete pump truck and an excavator work in the foreground among rebar stacks and concrete barriers. Fine dust haze catches low golden sun rays streaming between buildings, long realistic shadows, atmospheric depth. Distant Kinshasa skyline and the Congo River soft and hazy in the background. Shot from street level with a slight upward angle, full-frame camera, 35mm lens, f/8, tack-sharp detail, realistic materials and grime, cinematic warm grade with deep navy shadows, in the style of Foster + Partners and SOM project photography. No text, no watermark, no logos, no people close to camera."""

def gen(model):
    body = {
        "contents": [{"role": "user", "parts": [{"text": PROMPT}]}],
        "generationConfig": {
            "responseModalities": ["IMAGE"],
            "imageConfig": {"aspectRatio": "16:9"},
        },
    }
    req = urllib.request.Request(
        f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={KEY}",
        data=json.dumps(body).encode(),
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=180) as r:
        data = json.load(r)
    for part in data["candidates"][0]["content"]["parts"]:
        blob = part.get("inline_data") or part.get("inlineData")
        if blob:
            with open(OUT, "wb") as f:
                f.write(base64.b64decode(blob["data"]))
            return True
    return False

for model in ["gemini-3-pro-image-preview", "gemini-3.1-flash-image-preview"]:
    try:
        if gen(model):
            print(f"OK {model}")
            break
    except Exception as e:
        print(f"FAIL {model}: {e}")
else:
    sys.exit(1)
