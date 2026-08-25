# Project V R2 Uploader

Mobile-first multipart uploader for the Project V Cloudflare R2 source bucket.

## Target

- Worker: `https://projectv-storage.hrhw55tdmw.workers.dev`
- R2 key prefix: `source/`
- Part size: 32 MiB
- Designed for large `.7z` archives on iPhone Safari

## Features

- Cloudflare Worker/R2 connection test
- 32 MiB multipart chunks
- upload progress, speed, ETA and part count
- automatic retry with exponential backoff
- pause/resume during the current browser session
- multipart session metadata saved in `localStorage`
- reselecting the same file after a refresh restores completed-part metadata
- abort support

> Important: Safari does not retain permission to a local file after a full page reload. To resume after a reload, select the same source file again; the uploader will match it by file name, size, and modified time and continue from the stored multipart session.

The Cloudflare Worker owns the R2 binding (`PROJECTV`), so this frontend contains no R2 API secret credentials.
