/**
 * Created by DanielL on 10.06.2017.
 */

import React, { Children, PropTypes } from 'react';

import ThemeSubscription from './ThemeSubscription';

export default class ThemeProvider extends React.Component {

    static propTypes = {
        children: PropTypes.element.isRequired,
        theme: PropTypes.string.isRequired,
    };

    static defaultProps = {
        theme: undefined,
    };

    static childContextTypes = {
        theme: PropTypes.object,
    };

    constructor(props, context) {
        super(props, context);

        this.subscription = new ThemeSubscription(props.theme);
    }

    getChildContext() {
        return {
            theme: this.subscription,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.theme !== this.props.theme) {
            this.subscription.setTheme(nextProps.theme);
        }
    }

    render() {
        const { children } = this.props;

        return Children.only(children);
    }

}
