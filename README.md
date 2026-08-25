# Project V R2 Uploader

Mobile-first multipart uploader for the Project V source archive.

## Current build
- Cloudflare R2 multipart upload
- 32 MiB parts with 2 upload streams
- pause/resume and local session recovery
- network-switch recovery
- final object-size verification
- standalone PWA metadata
- PNG Safari favicon and iOS Home Screen icon assets

## iPhone icon refresh
Safari and Add to Home Screen can cache old icons. After this build deploys, open the site with `?v=7`, refresh once, remove any old Home Screen shortcut, then add it again from Safari.
