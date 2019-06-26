import React from "react";
import PropTypes from "prop-types";
import { Popup } from "./Popup";
export class ConfirmPopup extends Popup {
    confirm() {
        const res = this.props.onConfirmed();
        if (typeof res !== 'boolean' || res) {
            this.hide();
        }
    }
    getButtons() {
        return (
            <div>
                <button onClick={() => this.hide()}>Abbrechen</button>
                <button onClick={() => this.confirm()}>{this.props.confirmText || 'Bestätigen'}</button>
            </div>
        );
    }
} 

ConfirmPopup.propTypes = {
    ...Popup.propTypes,
    onConfirmed: PropTypes.func.isRequired,
    confirmText: PropTypes.string
};