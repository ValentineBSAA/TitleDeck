const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');

// This legacy runtime test will be upgraded when the separate 1.4.0
// source synchronization is merged into main. It must remain honest:
// changing release documentation does NOT make the checked-in runtime 1.4.0.
test('legacy 1.2.2 runtime and manifests agree', () => {
  const plugin = JSON.parse(read('plugin.json'));
  const pkg = JSON.parse(read('package.json'));
  assert.equal(plugin.version, '1.2.2');
  assert.equal(pkg.version, '1.2.2');
  assert.equal(plugin.name, 'TitleDeck');
  assert.equal(plugin.api_version, 1);
  assert.equal(read('src/index.js'), read('dist/index.js'));
  assert(read('src/index.js').includes("PLUGIN_VERSION = '1.2.2'"));
});

test('public 1.4.0 documentation describes the release and its known limits accurately', () => {
  const readme = read('README.md');
  const gallery = read('docs/SCREENSHOTS.md');
  const source = read('SOURCE.md');
  const releaseNotes = read('docs/RELEASE_NOTES_1.4.0.md');
  for (const phrase of ['1.4.0', 'physical Steam Deck', 'right-stick', 'Art Hero', 'Typography Studio']) {
    assert(readme.includes(phrase), 'README missing: ' + phrase);
  }
  assert(gallery.includes('22 real'), 'Current screenshot gallery count');
  assert(gallery.includes('12 featured screenshots'), 'Current gallery featured count');
  assert(gallery.includes('screenshots/v1.4.0/01-steam-home-custom-text-glow.jpeg'), 'Current gallery first image');
  assert(source.includes('Repository synchronization note'), 'Source must disclose branch/release mismatch');
  assert(releaseNotes.includes('intentionally read-only'), 'Art Hero limitation must be disclosed');
  assert(readme.includes("your titles you're deck!"), 'Community closing line must be preserved');
});
