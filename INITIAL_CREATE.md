# Initial Project Creation

This document descripes the steps that were done in order to setup this demo app.

## Create Project stub

After installing all the environment dependencies, we can now create the Application base:

```sh
react-native init ThingsAndStuff
```

### Fixing a bug

There is currently a bug with `react-native` version `0.57.2`, see [Issue: 21490](https://github.com/facebook/react-native/issues/21490)
that failes to start properly. Easiest fix is to revert back to version `0.57.1`.

- Change the dependency version in `ThingsAndStuff/package.json`
- Clear all `node_modules`and caches and re-install dependencies:

```sh
cd ThingsAndStuff
rm -rf node_modules
rm -rf $TMPDIR/react-* && watchman watch-del-all
npm install
npm install @babel/runtime
```

## Rename the app package

You can use the `react-native-rename` tool, read more from [react-native-init](https://github.com/teallabs/react-native-init) package.
or do it manually:

- Change the `applicationId` inside `ThingsAndStuff/android/app/build.gradle` to be `today.thingsandstuff.app`
- Change the `package` inside `ThingsAndStuff/android/app/src/AndroidManifest.xml` to be `today.thingsandstuff.app`
- Move the source files to correct path:

```sh
mkdir -p ThingsAndStuff/android/app/src/main/java/today/thingsandstuff/app
mv ThingsAndStuff/android/app/src/main/java/com/thingsandstuff/* ThingsAndStuff/android/app/src/main/java/today/thingsandstuff/app/
rm -r ThingsAndStuff/android/app/src/main/java/com
```

- Change the first line in the java source: `package com.thingsandstuff;` to be `package today.thingsandstuff.app;`

today.thingsandstuff.app

## Running the project

Then open the Android Emulator and once it is running, launch the project

```sh
cd ThingsAndStuff
react-native run-android
```

## Adding Firebase

You can follow up the setup process from [React Native Firebase - Initial Setup](https://rnfirebase.io/docs/v5.x.x/installation/initial-setup)
and the Android installation instructions.

Change the `compile` statements `implementation`:
- Change `compile project(':react-native-firebase')` to `implementation project(':react-native-firebase')`

In the `android/build.gradle` add following dependencies:
- `classpath 'com.google.gms:google-services:4.0.2'`
In the  `android/app/build.gradle` add following dependencies:
- `implementation "com.google.android.gms:play-services-base:16.0.1"`
- `implementation 'com.google.firebase:firebase-core:16.0.3'`
Finally add the Google Services plugin as the last row in the `android/app/build.gradle`
- `apply plugin: 'com.google.gms.google-services'`

Now you can re-compile and run the app:

```sh
react-native run-android
```
