# react-native-theme
An efficient and `StyleSheet.create` compatible theming library for React Native.


## Installation
> `$ npm install --save react-native-theming`  


## Usage
### Create themes

```javascript
import { createTheme } from 'react-native-theming'

const themes = [
  createTheme({
    backgroundColor: 'white',
    textColor: 'black',
    buttonColor: 'blue',
    buttonText: 'white',
    icon: require('./icons/default.png'),
    statusBar: 'dark-content',
  }, 'Light'),
  createTheme({
    backgroundColor: 'black',
    textColor: 'white',
    buttonColor: 'yellow',
    buttonText: 'black',
    icon: require('./icons/colorful.png'),
    statusBar: 'light-content',
  }, 'Dark'),
];
```