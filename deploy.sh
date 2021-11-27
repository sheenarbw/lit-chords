#!/bin/sh
npm run build && \
yes | gcloud app deploy --project music-practice-apps


