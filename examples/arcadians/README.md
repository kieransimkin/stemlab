# Arcadians reference song

`Arcadians` by Kieran Simkin is the project reference song for exercising
StemLab's known-information and timeline layers.

Known canonical data bundled here:

- BPM: **145.0**
- canonical lyrics: `lyrics.txt`
- canonical cover art: `cover.jpg`
- canonical master identity: SHA-256
  `b72436c8d3741a86b75af603f702e063b3c5be96738dd02181f32b74bdea1366`
- canonical master duration: `273.604558` seconds
- canonical lyric-timing authority: `canonical-lyric-timing.lrc`, SHA-256
  `92b46abc4caf1caa8eddf7c306a9e767f8d0bbefed3b39d38e4b4f96981e9de7`

The canonical master audio itself is not committed here. Use the artist master
whose SHA-256 matches the value above, upload it to the StemLab web service,
then load the Arcadians reference from the upload form.

The exact manually edited LRC is also not reconstructed from summary metadata.
If the original `canonical-lyric-timing.lrc` is available, paste it into the
Canonical lyric timing field (or PUT it via the canonical metadata endpoint)
and StemLab will render it as a timed reference lane. Blank LRC timestamp lines
are interpreted as lyric clear/end events.

`reference.json` records the expected identities and validation metadata.
`canonical.json` is a directly usable metadata payload containing the canonical
BPM and lyrics.
