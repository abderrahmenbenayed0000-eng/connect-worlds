#!/usr/bin/env bash
set -e
mkdir -p www && cp index.html www/index.html
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor-community/admob
[ -d android ] || npx cap add android
node patch-android.js
npx cap sync android
