import React from "react";
import PropTypes from "prop-types";
import { Popup } from "./Popup";
export class PaymentPopup extends Popup {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            value: 0.0,
            errors: [],
            invalid: true
        };
    }
    componentDidUpdate(oldProps, oldState) {
        if (this.state.isVisible && !oldState.isVisible) {
            this.paymentInput.focus();
        }
    }
    confirm() {
        this.props.onConfirmed(Number(this.props.customerId), this.state.value);
        this.updateValue(0);
        this.hide();
    }
    getButtons() {
        return (
            <div>
                <button onClick={() => this.hide()}>Abbrechen</button>
                <button disabled={this.state.invalid} onClick={() => this.confirm()}>Akzeptieren</button>
            </div>
        );
    }
    updateValue(value) {
        if (isNaN(value) || value <= 0) {
            this.setState({
                value: Number(value),
                invalid: true,
                errors: [
                    'Bitte positiven Betrag angeben!'
                ]
            });
        } else {
            this.setState({
                value: Number(value),
                invalid: false,
                errors: []
            });
        }
    }
    getContent() {
        return (
            <div className='payment-popup'>
                <div>
                    <label htmlFor='input-payment'>Betrag: </label>
                    <input
                        id='input-payment'
                        ref={input => this.paymentInput = input}
                        type="number"
                        min={0}
                        max={1000}
                        step={.1}
                        value={this.state.value}
                        onChange={(e) => this.updateValue(e.target.value)}>
                    </input>
                </div>
                <ul>{this.state.errors.map((error, index) => <li key={`err-${index}`}>{error}</li>)}</ul>
            </div>
        );
    }
} 

PaymentPopup.propTypes = {
    ...Popup.propTypes,
    onConfirmed: PropTypes.func.isRequired,
    customerId: PropTypes.string.isRequired
};