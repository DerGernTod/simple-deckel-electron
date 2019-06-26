import React from "react";
import PropTypes from "prop-types";

export class VKeyboardNumericInput extends React.Component {
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
    handleChange(val, isNative, emptyCallback) {
        this.setState({
            value: val
        });
        if (isNative) {
            this.props.updateKeyboardTarget(this.props.id, val => this.handleChange(val), val);
            if (emptyCallback){
                this.props.updateKeyboardTarget('', () => void 0, '');
            }
        }
        this.props.onChange && this.props.onChange(val);
    }
    handleFocus(evt) {
        this.props.updateKeyboardTarget(this.props.id, val => this.handleChange(val), this.state.value);
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
    getValue() {
        return parseFloat(this.state.value, 10) || 0;
    }
    render() {
        return (
            <React.Fragment>
                <input type='number'
                    ref={input => this.input = input}
                    id={this.props.id}
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    onChange={evt => this.handleChange(evt.target.value, true)}
                    onFocus={evt => this.handleFocus(evt)}
                    min={this.props.min}
                    max={this.props.max}
                    step={this.props.step}
                />
            </React.Fragment>
        );
    }
}

VKeyboardNumericInput.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    vkeyboardTarget: PropTypes.string.isRequired
};

