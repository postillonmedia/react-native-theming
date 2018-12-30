/**
 * Created by DanielL on 10.06.2017.
 */

import React, { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';

import ThemeContext from './Context';

export default class ThemeProvider extends PureComponent {

    static propTypes = {
        children: PropTypes.element.isRequired,
        theme: PropTypes.string.isRequired,
        context: PropTypes.object,
    };

    static defaultProps = {
        theme: undefined,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { children, context: Context = ThemeContext, theme } = this.props;

        return (
            <Context.Provider value={{theme}}>
                {children}
            </Context.Provider>
        );
    }

}
