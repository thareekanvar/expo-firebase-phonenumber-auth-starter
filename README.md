# expo-firebase-phonenumber-auth-starter 🔥

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />  
</p>

Is a quicker way to start with Expo + Firebase projects. It includes:

- based on Expo SDK `38.x.x`
- navigation using `react-navigation` 5.x.x
- Firebase as backend for phone auth
- custom and reusable form components
- handles different field types in forms
- handles server errors using Formik
- Login/Code form built using Formik & yup
- uses Context API & checks user's auth state
- all components are now functional components and use [React Hooks](https://reactjs.org/docs/hooks-intro.html)

## Installation

- Clone this repo
- to install dependencies: `npm install` or `yarn install`
- rename the file `example.firebaseConfig.js` to `firebaseConfig.js`
- and make sure to add your own Firebase config in this file as shown below.

```js
// Rename this file to "firebaeConfig.js" before use
// Replace all Xs with real Firebase API keys

export default {
  apiKey: 'XXXX',
  authDomain: 'XXXX',
  databaseURL: 'XXXX',
  projectId: 'XXXX',
  storageBucket: 'XXXX',
  messagingSenderId: 'XXXX',
  appId: 'XXXX'
};
```

## Screens

Main screens:

- Welcome
- Login
- Home

## ⚠️⚠️⚠️

thanx to [expo-firebase-starter](https://github.com/expo-community/expo-firebase-starter) ( help me a lot )
