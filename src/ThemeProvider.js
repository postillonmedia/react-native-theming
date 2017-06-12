/**
 * Created by DanielL on 10.06.2017.
 */

import React, { Children, PropTypes } from 'react';

export default class ThemeProvider extends React.Component {

    static propTypes = {
        children: PropTypes.element.isRequired,
        theme: PropTypes.string.isRequired,
    };

    static defaultProps = {
        theme: undefined,
    };

    static childContextTypes = {
        theme: PropTypes.string,
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            theme: props.theme,
        };
    }

    getChildContext() {
        return {
            theme: this.state.theme,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.theme !== this.props.theme) {
            this.setState({
                theme: nextProps.theme,
            });
        }
    }

    render() {
        const { children } = this.props;

        return Children.only(children);
    }

}
