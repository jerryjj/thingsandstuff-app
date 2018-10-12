# ThingsAndStuff.today Application

This repository is an example Android Application that is built during
a Presentation.
Currently the App has been develop only in Android environment, thus all the instructions are based
on Android dev only.

## Environment Setup

This project has been built with React Native. To prepare your environment, follow
the official instructions from here [React Native: Getting Started](https://facebook.github.io/react-native/docs/getting-started.html),
using instructions under the tab `Building Project With Native Code`.

It is important to instal Java JDK version 8, I've used the OpenJDK and installed it with `homebrew`

```sh
brew tap caskroom/cask
brew tap caskroom/versions
brew cask install java8
```

If you have multiple JDKs, set the `JAVA_HOME` environment to point to correct version.

## Firebase & Credentials setup

To be able to compile this app yourself, you need to have a Firebase project and add Android project to it and download its credentials.
This flow is outside the scope of this demo.

## Repository Setup

This repository has been setup to support different steps in the presentation, so each of the steps have been split into their own
branches.
