import React from "react";
import PropTypes from "prop-types";
import { Popup } from "./Popup";
import { VKeyboardNumericInputContainer } from "../../../containers/utils/vkeyboard-numeric-input-container";
export class PaymentPopup extends Popup {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            errors: []
        };
    }
    confirm() {
        const val = this.paymentInput.getValue();
        if (val > 0) {
            this.props.onConfirmed(this.props.customerId, val, this.props.loggedInUser.id);
            this.hide();
            return;
        }
        
        this.setState({
            errors: ['Bitte gültigen Wert angeben.']
        });
    }
    componentDidUpdate(oldProps, oldState) {
        if (this.state.isVisible && !oldState.isVisible) {
            this.paymentInput.handleChange(String(this.props.total), true);
            this.paymentInput.focus();
        }
    }
    hide() {
        super.hide();
        this.props.onHide();
        this.setState({
            errors: []
        });
        this.paymentInput.handleChange(0, true, true);
    }
    getButtons() {
        return (
            <div>
                <button onClick={() => this.hide()}>Abbrechen</button>
                <button disabled={!!this.state.errors.length} onClick={() => this.confirm()}>Bestätigen</button>
            </div>
        );
    }
    resetErrors() {
        this.setState({
            errors: []
        });
    }
    updateValue(value) {
        if (isNaN(value) || value <= 0) {
            this.setState({
                errors: [
                    'Bitte positiven Betrag angeben!'
                ]
            });
        } else {
            this.setState({
                errors: []
            });
        }
    }
    getContent() {
        return (
            <div className='payment-popup'>
                <div>
                    <label htmlFor='input-payment'>Betrag: </label>
                    <VKeyboardNumericInputContainer
                        id='input-payment'
                        ref={input => this.paymentInput = input}
                        min={0}
                        max={1000}
                        step={.1}
                        onFocus={() => this.resetErrors()}>
                    </VKeyboardNumericInputContainer>
                </div>
                <ul>{this.state.errors.map((error, index) => <li key={`err-${index}`}>{error}</li>)}</ul>
            </div>
        );
    }
} 

PaymentPopup.propTypes = {
    ...Popup.propTypes,
    onHide: PropTypes.func.isRequired,
    onConfirmed: PropTypes.func.isRequired,
    customerId: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
};