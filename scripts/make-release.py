#!/usr/bin/env python3
"""Build auditable TitleDeck installer/source ZIP files from a matching checkout."""
import json
import pathlib
import subprocess
import sys
import zipfile
ROOT=pathlib.Path(__file__).resolve().parent.parent
subprocess.run(['node','scripts/sync-version.mjs','--check'],cwd=ROOT,check=True)
subprocess.run(['node','--test',*sorted(str(p.relative_to(ROOT)) for p in (ROOT/'tests').glob('*.test.cjs'))],cwd=ROOT,check=True,stdout=subprocess.DEVNULL)
subprocess.run([sys.executable,'-m','unittest','discover','-s','tests','-p','test_*.py'],cwd=ROOT,check=True,stdout=subprocess.DEVNULL)
subprocess.run(['node','--check','src/index.js'],cwd=ROOT,check=True)
subprocess.run([sys.executable,'-m','py_compile','main.py'],cwd=ROOT,check=True)
version=json.loads((ROOT/'package.json').read_text())['version']
files=['plugin.json','package.json','main.py','dist/index.js',
       'assets/titledeck-icon.png','assets/titledeck-qam.webp',
       'assets/titledeck-font-132.svg','assets/titledeck-font-132-32.png',
       'assets/titledeck-font-132-64.png','assets/titledeck-font-132-128.png',
       'README.md','CHANGELOG.md','LICENSE']
installer=ROOT.parent/('TitleDeck-'+version+'-Rebuilt.zip')
source=ROOT.parent/('TitleDeck-'+version+'-Repository-Source.zip')
for rel in files:
    if not (ROOT/rel).is_file():raise RuntimeError('Missing '+rel)
with zipfile.ZipFile(installer,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
    for rel in files:z.write(ROOT/rel,'TitleDeck/'+rel)
with zipfile.ZipFile(source,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
    for file in ROOT.rglob('*'):
        if not file.is_file() or '.git' in file.parts or '__pycache__' in file.parts or file.suffix=='.pyc':continue
        z.write(file,'TitleDeck/'+str(file.relative_to(ROOT)))
for output in (installer,source):
    with zipfile.ZipFile(output) as z:
        assert z.testzip() is None
        assert json.loads(z.read('TitleDeck/plugin.json'))['version']==version
    print(output.name,output.stat().st_size,'bytes')
print('NOTE: A newly built installer may have different README/CHANGELOG content than the original tested release asset.')
