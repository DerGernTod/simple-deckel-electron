import React from 'react';
import { Popup } from "./Popup";
import PropTypes from "prop-types";
import { VKeyboardTextInputContainer } from '../../../containers/utils/vkeyboard-text-input-container';
export class LoginPopup extends Popup {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            errors: []
        };
    }
    componentDidUpdate(oldProps, oldState) {
        if (this.state.isVisible && !oldState.isVisible) {
            this.usernameInput.focus();
        }
    }
    hide() {
        super.hide();
        this.passwordInput.reset();
        this.props.updateKeyboardTarget('', () => void 0, '');
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
        const username = this.usernameInput.getValue();
        const password = this.passwordInput.getValue();
        if (!username) {
            errors.push('Bitte Benutzername angeben.');
        }
        const foundUser = this.props.users.filter(user => user.name === username)[0];
        if (username && !foundUser) {
            errors.push('Unbekannter Benutzer.')
        } else if (foundUser) {
            // todo: hash pw here
            const hashedPw = password;
            if (foundUser.password === hashedPw) {
                this.props.onLogin(foundUser.id, foundUser.name);
                this.props.onConfirmed(foundUser.name);
                this.hide();
            } else if (hashedPw) {
                errors.push('Falsches Passwort.');
            }
        }
        if (!password) {
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
    getContent() {
        return (
            <div className='login-popup'>
                <div>
                    <label htmlFor='login-popup-username'>Benutzer</label>
                    <VKeyboardTextInputContainer type='text'
                        id='login-popup-username'
                        ref={input => this.usernameInput = input}
                        placeholder='z.B. Brucker'
                        onFocus={e => this.resetErrors()}
                    ></VKeyboardTextInputContainer>
                </div>
                <div>
                    <label htmlFor='login-popup-password'>Passwort</label>
                    <VKeyboardTextInputContainer type='password'
                        id='login-popup-password'
                        ref={input => this.passwordInput = input}
                        placeholder='z.B. ************'
                        onFocus={e => this.resetErrors()}
                    ></VKeyboardTextInputContainer>
                </div>
                <ul>{this.state.errors.map((error, index) => <li key={`err-${index}`}>{error}</li>)}</ul>
            </div>
        );
    }
}

LoginPopup.propTypes = {
    ...Popup.propTypes,
    onConfirmed: PropTypes.func,
    onLogin: PropTypes.func.isRequired,
    vkeyboardTarget: PropTypes.string.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    })).isRequired
};