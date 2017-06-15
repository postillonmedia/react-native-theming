/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

class ThemeManagerClass {

    themes;

    constructor() {
        this.themes = {};
    }

    addStyleSheet(stylesheet, component, theme = 'default') {
        if (typeof component !== 'string') {
            throw Error('Component must be a string');
        }
        if (typeof theme !== 'string') {
            throw Error('Theme must be a string');
        }

        if (!this.themes[theme]) {
            this.themes[theme] = {};
        }

        if (!this.themes[theme][component]) {
            // new stylesheet for this component
            this.themes[theme][component] = stylesheet;
        } else {
            // merge stylesheet with existing
            this.themes[theme][component] = StyleSheet.flatten(this.themes[theme][component], stylesheet);
        }
    }

    getStyleSheetForComponent(component, theme = 'default') {
        if (typeof component !== 'string') {
            throw Error('Component must be a string');
        }
        if (typeof theme !== 'string') {
            throw Error('Theme must be a string');
        }

        const stylesheet = this.themes[theme][component];

        if (!stylesheet) {
            console.warn('There is no StyleSheet added for the connected Component');
            return {};
        }

        return stylesheet;
    }
}

export const ThemeManager = new ThemeManagerClass();

export default ThemeManager;