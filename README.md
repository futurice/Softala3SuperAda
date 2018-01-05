SuperAda App
============

Building:

1. Install **java8** (9 does not work)
2. Install Android sdk platform v23, set your ANDROID_HOME & ANDROID_SDK_ROOT envvars
3. Run `npm install` in root of repo

Android:

1. Follow instructions in Spice Program Google drive (Spice Program -> Chilicorn Fund -> CCF Projects -> Super-Ada -> Secrets) to set up the Android keystore required for production build signing.

2. ```
   cd android
   ./gradlew assembleRelease
   ```

3. Output is in `android/app/build/outputs/apk/app-release.apk`

iOS:

Install the Futurice developer certificate, hit build in Xcode and hope for the best...
