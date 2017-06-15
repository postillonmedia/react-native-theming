/**
 * Created by DanielL on 10.06.2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ThemeManager from './ThemeManager';

export const connectStyle = componentName => component => {

    const getComponentDisplayName = (WrappedComponent) => {
        return WrappedComponent.displayName || WrappedComponent.name || componentName;
    };

    const ThemeComponent = WrappedComponent => class extends Component {
        constructor(props, context) {
            super();

            const { theme } = context;

            this.state = {
                theme: theme.getTheme(),
            };

            this.unsubscribe = theme.subscribe((theme) => {
                this.setState({
                    theme,
                });
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

            const props = {
                ...this.props,
                theme,
                styles: ThemeManager.getStyleSheetForComponent(componentName, theme),
            };

            return <WrappedComponent {...props} />;
        }
    };

    return ThemeComponent(component);
};

export default connectStyle;