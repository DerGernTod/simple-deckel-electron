import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import { VKeyboardTextInputContainer } from "../../containers/utils/vkeyboard-text-input-container";
import { ConfirmPopup } from '../utils/popups/ConfirmPopup';

export class UserScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deletion: {
                id: -1,
                name: ''
            },
            errors: []
        }
    }
    showAddPopup() {
        this.addPopup.show()
        this.nameInput.focus();
        this.nameInput.select();
    }
    deleteUser(id, name) {
        this.setState({
            deletion: {
                id,
                name
            }
        });
        this.deletePopup.show();
    }
    resetErrors() {
        this.setState({
            errors: []
        });
    }
    validateAdd() {
        const nameValue = this.nameInput.getValue();
        const pw1Value = this.pwInput.getValue();
        const pw2Value = this.pw2Input.getValue();
        const errors = [];
        if (!nameValue || nameValue.length === 0) {
            errors.push('Bitte Namen angeben.');
        }
        if (!pw1Value || pw1Value.length < 6) {
            errors.push('Passwort muss mindestens 6 Zeichen enthalten.')
        }
        if (pw1Value !== pw2Value) {
            errors.push('Passworter stimmen nicht überein.');
        }
        if (errors.length) {
            this.setState({
                errors
            });
            return false;
        }
        this.props.onUserAdded(nameValue, pw1Value, this.props.loggedInUser.id < 0 ? 0 : this.props.loggedInUser.id);
        this.props.updateKeyboardTarget('', () => void 0, '');
        return true;
    }
    render() {
        if (this.props.loggedInUser.id < 0) {
            setTimeout(() => this.props.history.push('/overview'), 3000);
            return (<div>Access denied, redirecting...</div>);
        }
        const formatter = Intl.DateTimeFormat('de', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        const deleteEnabled = this.props.users.length > 1;
        return (
            <React.Fragment>
                <ConfirmPopup onConfirmed={() => this.validateAdd()} title='Kunden hinzufügen' ref={popup => this.addPopup = popup} width="500px" height="400px">
                    <div className='add-user-popup'>
                        <div>
                            <label htmlFor='add-user-popup-name'>Name</label>
                            <VKeyboardTextInputContainer type='text'
                                id='add-user-popup-name'
                                ref={input => this.nameInput = input}
                                placeholder='z.B. Brucker'
                                onFocus={e => this.resetErrors()}
                            ></VKeyboardTextInputContainer>
                        </div>
                        <div>
                            <label htmlFor='add-user-popup-pw'>Passwort</label>
                            <VKeyboardTextInputContainer type='password'
                                id='add-user-popup-pw'
                                ref={input => this.pwInput = input}
                                onFocus={e => this.resetErrors()}
                            ></VKeyboardTextInputContainer>
                        </div>
                        <div>
                            <label htmlFor='add-user-popup-pw2'>Passwort wiederholen</label>
                            <VKeyboardTextInputContainer type='password'
                                id='add-user-popup-pw2'
                                ref={input => this.pw2Input = input}
                                onFocus={e => this.resetErrors()}
                            ></VKeyboardTextInputContainer>
                        </div>
                        <ul>{this.state.errors.map(error => <li>{error}</li>)}</ul>
                    </div>
                </ConfirmPopup>
                <ConfirmPopup onConfirmed={() => this.props.onUserDeleted(this.state.deletion.id)} title='Wirklich löschen?' ref={popup => this.deletePopup = popup} confirmText='Löschen'>
                    <div>
                        Soll '{this.state.deletion.name}' wirklich gelöscht werden?
                    </div>
                </ConfirmPopup>
                <div className='column full-height broad'>
                    <div className='panel full-height'>
                        <table className='user-details-list'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Ersteller</th>
                                    <th>Erstellt am</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.users.map(({id, name, createdBy, timestamp}) => <tr key={id}>
                                    <td>{name}</td>
                                    <td>{createdBy}</td>
                                    <td>{formatter.format(timestamp)}</td>
                                    <td><button disabled={!deleteEnabled} onClick={() => this.deleteUser(id, name)}>Löschen</button></td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='column full-height slim'>
                    <div className="full-height overview-controls flex">
                        <div className="flex">
                            <button className='full-height' onClick={() => this.showAddPopup()}>+</button>
                        </div>
                        <div className="flex">
                            <NavLink to='/overview' >
                                <button className='full-height full-width'>Zurück</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

UserScreen.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        createdBy: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired
    })).isRequired,
    loggedInUser: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }),
    onUserAdded: PropTypes.func.isRequired,
    onUserDeleted: PropTypes.func.isRequired,
    updateKeyboardTarget: PropTypes.func.isRequired
};