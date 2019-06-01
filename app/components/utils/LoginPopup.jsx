import React from 'react';
import { Popup } from "./Popup";
import PropTypes from "prop-types";

export class LoginPopup extends Popup {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            password: '',
            username: '',
            errors: []
        };
    }
    hide() {
        super.hide();
        this.setState({
            password: ''
        });
    }
    getButtons() {
        return (
            <div>
                <button onClick={() => this.hide()}>Abbrechen</button>
                <button onClick={() => this.validate()}>Akzeptieren</button>
            </div>
        );
    }
    validate() {
        const errors = [];
        if (this.state.password && this.state.username) {
            this.props.onConfirmed(this.state.username);
            this.hide();
            return;
        }
        if (!this.state.username) {
            errors.push('Bitte Benutzername angeben.');
        }
        if (!this.state.password) {
            errors.push('Bitte Passwort angeben.');
        }
        this.setState({
            errors
        });
    }
    resetErrors() {
        this.setState({
            errors: []
        });
    }
    handleChange(evt) {
        this.setState({
            [evt.target.id.substr(12)]: evt.target.value
        });
    }
    getContent() {
        return (
            <div className='login-popup'>
                <div>
                    <label htmlFor='login-popup-username'>Benutzer</label>
                    <input type='text'
                        id='login-popup-username'
                        placeholder='z.B. Brucker'
                        value={this.state.username}
                        onFocus={() => this.resetErrors()}
                        onChange={e => this.handleChange(e)}
                    ></input>
                </div>
                <div>
                    <label htmlFor='login-popup-password'>Passwort</label>
                    <input type='password'
                        id='login-popup-password'
                        placeholder='z.B. ************'
                        value={this.state.password}
                        onFocus={() => this.resetErrors()}
                        onChange={e => this.handleChange(e)}
                    ></input>
                </div>
                <ul>{this.state.errors.map((error, index) => <li key={`err-${index}`}>{error}</li>)}</ul>
                
                
            </div>
        );
    }
}

LoginPopup.propTypes = {
    ...Popup.propTypes,
    onConfirmed: PropTypes.func.isRequired
};