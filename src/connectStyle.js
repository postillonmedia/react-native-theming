/**
 * Created by DanielL on 10.06.2017.
 */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import hoistStatics from 'hoist-non-react-statics';

import ThemeContext from './Context';
import ThemeManager from './ThemeManager';


const defaultOptions = {
    themePropsName: 'theme',
    stylesPropsName: 'styles',
    constantsPropsName: 'constants',
    callback: undefined,
};

export const connectStyle = (componentName, customOptions = {}) => component => {

    const options = Object.assign({}, defaultOptions, customOptions);

    const getComponentDisplayName = (WrappedComponent) => {
        return WrappedComponent.displayName || WrappedComponent.name || componentName;
    };

    const ThemeComponent = WrappedComponent => class extends PureComponent {

        static displayName = `Styled(${getComponentDisplayName(WrappedComponent)})`;
        static componentName = `Styled(${getComponentDisplayName(WrappedComponent)})`;

        static contextType = ThemeContext;

        render() {
            const { callback } = options;
            const { theme } = this.context;

            const styles = ThemeManager.getStyleSheetForComponent(componentName, theme);
            const constants = ThemeManager.getConstantsForTheme(theme);

            const props = {
                ...this.props,
                [options.themePropsName]: theme,
                [options.stylesPropsName]: styles,
                [options.constantsPropsName]: constants,
            };

            if (callback && typeof callback === 'function') {
                callback(theme, props);
            }

            return <WrappedComponent {...props} />;
        }
    };

    return hoistStatics(ThemeComponent(component), component);
};

export default connectStyle;