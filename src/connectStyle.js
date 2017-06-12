/**
 * Created by DanielL on 10.06.2017.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

import ThemeManager from './ThemeManager';

export const connectStyle = componentName => component => {

    const ThemeComponent = ComposedComponent => class extends Component {
        constructor() {
            super();

            if (!ComposedComponent.contextTypes) {
                ComposedComponent.contextTypes = {};
            }
            ComposedComponent.contextTypes.theme = PropTypes.string;
        }

        static componentName = `Styled(${componentName})`;

        static contextTypes = {
            theme: PropTypes.string
        };

        render() {
            const { theme } = this.context;

            const props = {
                ...this.props,
                theme,
                styles: ThemeManager.getStyleSheetForComponent(componentName, theme),
            };

            return <ComposedComponent {...props} />;
        }
    };

    return ThemeComponent(component);
};

export default connectStyle;