/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

class ThemeManagerClass {

    stylesheets;
    constants;

    constructor() {
        this.stylesheets = {};
        this.constants = {};
    }

    addStyleSheet(stylesheet, component, theme = 'default') {
        if (typeof component !== 'string') {
            throw Error('Component must be a string');
        }
        if (typeof theme !== 'string') {
            throw Error('Theme must be a string');
        }

        if (!this.stylesheets[theme]) {
            this.stylesheets[theme] = {};
        }

        if (!this.stylesheets[theme][component]) {
            // new stylesheet for this component
            this.stylesheets[theme][component] = stylesheet;
        } else {
            // merge stylesheet with existing
            this.stylesheets[theme][component] = StyleSheet.flatten(this.stylesheets[theme][component], stylesheet);
        }
    }

    getStyleSheetForComponent(component, theme = 'default') {
        if (typeof component !== 'string') {
            throw Error('Component must be a string');
        }
        if (typeof theme !== 'string') {
            throw Error('Theme must be a string');
        }

        const stylesheet = this.stylesheets[theme][component];

        if (!stylesheet) {
            console.warn('There is no StyleSheet added for the connected Component');
            return {};
        }

        return stylesheet;
    }

    addConstants(constants, theme) {
        if (typeof theme !== 'string') {
            throw Error('Theme must be a string');
        }

        this.constants[theme] = constants;
    }

    getConstantsForTheme(theme) {
        const constants = this.constants[theme];

        if (!constants) {
            console.warn('There is no Constants added for the current Theme');
            return {};
        }

        return constants;
    }
}

export const ThemeManager = new ThemeManagerClass();

export default ThemeManager;