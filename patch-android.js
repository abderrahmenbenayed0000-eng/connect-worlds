// Run after `npx cap add android`. Adds the AdMob app id + portrait lock.
const fs = require('fs'), path = require('path');
const APP_ID = process.env.ADMOB_APP_ID || 'ca-app-pub-6444166811459971~8010802558'; // your AdMob app id
const res = path.join('android', 'app', 'src', 'main', 'res', 'values', 'strings.xml');
let x = fs.readFileSync(res, 'utf8');
if (!x.includes('admob_app_id')) x = x.replace('</resources>', `    <string name="admob_app_id">${APP_ID}</string>\n</resources>`);
else x = x.replace(/(<string name="admob_app_id">)[^<]*(<\/string>)/, `$1${APP_ID}$2`);
fs.writeFileSync(res, x);
const mf = path.join('android', 'app', 'src', 'main', 'AndroidManifest.xml');
let m = fs.readFileSync(mf, 'utf8');
if (!m.includes('com.google.android.gms.ads.APPLICATION_ID'))
  m = m.replace('</application>', '    <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="@string/admob_app_id"/>\n    </application>');
if (!m.includes('screenOrientation')) m = m.replace('<activity', '<activity android:screenOrientation="portrait"');
if (!m.includes('android.permission.VIBRATE')) m = m.replace('</manifest>', '    <uses-permission android:name="android.permission.VIBRATE"/>\n</manifest>');
fs.writeFileSync(mf, m);
console.log('Android project patched with AdMob app id:', APP_ID);
