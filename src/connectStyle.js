/**
 * Created by DanielL on 10.06.2017.
 */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import hoistStatics from 'hoist-non-react-statics';

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
        constructor(props, context) {
            super();

            const { theme } = context;
            const { callback } = options;

            this.state = {
                theme: theme.getTheme(),
            };

            this.unsubscribe = theme.subscribe((nextTheme) => {
                this.setState({
                    theme: nextTheme,
                });

                const prevTheme = this.state.theme;

                if (callback && typeof callback === 'function' && prevTheme !== nextTheme) {
                    callback(theme, this.props);
                }
            });
        }

        static displayName = `Styled(${getComponentDisplayName(WrappedComponent)})`;
        static componentName = `Styled(${getComponentDisplayName(WrappedComponent)})`;

        static contextTypes = {
            theme: PropTypes.object,
        };

        componentWillUnmount() {
            if (this.unsubscribe) {
                this.unsubscribe();
            }
        }

        render() {
            const { theme } = this.state;

            const styles = ThemeManager.getStyleSheetForComponent(componentName, theme);
            const constants = ThemeManager.getConstantsForTheme(theme);

            const props = {
                ...this.props,
                [options.themePropsName]: theme,
                [options.stylesPropsName]: styles,
                [options.constantsPropsName]: constants,
            };

            return <WrappedComponent {...props} />;
        }
    };

    return hoistStatics(ThemeComponent(component), component);
};

export default connectStyle;