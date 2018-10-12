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

## Running the project

Then open the Android Emulator and once it is running, launch the project

```sh
cd ThingsAndStuff
react-native run-android
```
