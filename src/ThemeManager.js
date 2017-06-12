/**
 * Created by DanielL on 12.06.2017.
 */

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

        this.themes[theme][component] = stylesheet;
    }

    getStyleSheetForComponent(component, theme = 'default') {
        if (typeof component !== 'string') {
            throw Error('Component must be a string');
        }
        if (typeof theme !== 'string') {
            throw Error('Theme must be a string');
        }

        return this.themes[theme][component];
    }
}

export const ThemeManager = new ThemeManagerClass();

export default ThemeManager;