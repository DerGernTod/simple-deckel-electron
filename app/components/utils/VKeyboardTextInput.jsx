import React from "react";
import PropTypes from "prop-types";

export class VKeyboardTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }
    componentWillReceiveProps(newProps) {
        if (this.input.id === newProps.vkeyboardTarget) {
            this.input.classList.add('focused');
        } else {
            this.input.classList.remove('focused');
        }
    }
    handleChange(val, isNative) {
        this.setState({
            value: val
        });
        if (isNative) {
            this.props.updateKeyboardTarget(this.props.id, val => this.handleChange(val), val);    
        }
        this.props.onChange && this.props.onChange(val);
    }
    handleFocus(evt) {
        this.props.updateKeyboardTarget(this.props.id, val => this.handleChange(val), evt.target.value);
        const targetTextLength = evt.target.value.length;
        evt.target.setSelectionRange(targetTextLength, targetTextLength);
        this.props.onFocus && this.props.onFocus(evt);
    }
    focus() {
        this.input.focus();
    }
    reset() {
        this.setState({
            value: ''
        });
    }
    setValue(value) {
        this.setState({
            value
        });
    }
    getValue() {
        return this.state.value;
    }
    render() {
        return (
            <React.Fragment>
                <input type={this.props.type}
                    {...this.props}
                    ref={input => this.input = input}
                    value={this.state.value}
                    onChange={evt => this.handleChange(evt.target.value, true)}
                    onFocus={evt => this.handleFocus(evt)}
                />
            </React.Fragment>
        );
    }
}

VKeyboardTextInput.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    vkeyboardTarget: PropTypes.string.isRequired
};

