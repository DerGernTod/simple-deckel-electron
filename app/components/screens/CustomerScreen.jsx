import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import { VKeyboardTextInputContainer } from "../../containers/utils/vkeyboard-text-input-container";
import { ConfirmPopup } from '../utils/popups/ConfirmPopup';
export class CustomerScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deletion: {
                id: -1,
                name: ''
            },
            editing: {
                id: -1,
                name: ''
            },
            errors: []
        }
    }
    componentDidMount() {
        this.props.loadCustomers();
    }
    showAddPopup() {
        this.addPopup.show();
    }
    deleteCustomer(id, name) {
        this.setState({
            deletion: {
                id,
                name
            }
        });
        this.deletePopup.show();
    }
    editCustomer(id, name) {
        this.setState({
            editing: {
                id,
                name
            }
        });
        this.editPopup.show();
    }
    resetErrors() {
        this.setState({
            errors: []
        });
    }
    validateAdd() {
        const nameValue = this.nameInput.getValue();
        if (!nameValue || nameValue.length === 0) {
            this.setState({
                errors: ['Bitte Namen angeben']
            });
            return false;
        }
        this.props.onCustomerAdded(nameValue, this.props.loggedInUser.id < 0 ? 0 : this.props.loggedInUser.id);
        this.resetKeyboard();
        this.nameInput.reset();
        return true;
    }
    validateEdit() {
        const nameValue = this.editNameInput.getValue();
        if (!nameValue || nameValue.length === 0) {
            this.setState({
                errors: ['Bitte Namen angeben']
            });
            return false;
        }
        this.props.onCustomerUpdated(this.state.editing.id, nameValue, this.props.loggedInUser.id < 0 ? 0 : this.props.loggedInUser.id);
        this.resetKeyboard();
        this.editNameInput.reset();
        this.setState({
            editing: {
                id: -1,
                name: ''
            }
        });
        return true;
    }
    resetKeyboard() {
        this.props.updateKeyboardTarget('', () => void 0, '');
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
        return (
            <React.Fragment>
                <ConfirmPopup
                    onShow={() => {
                        this.nameInput.focus();
                    }}
                    onHide={() => {
                        this.nameInput.reset();
                        this.resetKeyboard();
                    }}
                    onConfirmed={() => this.validateAdd()}
                    title='Kunden hinzufügen'
                    ref={popup => this.addPopup = popup}>
                    <div className='add-customer-popup'>
                        <div>
                            <label htmlFor='add-customer-popup-name'>Name</label>
                            <VKeyboardTextInputContainer type='text'
                                id='add-customer-popup-name'
                                ref={input => this.nameInput = input}
                                placeholder='z.B. Brucker'
                                onFocus={e => this.resetErrors()}
                            ></VKeyboardTextInputContainer>
                        </div>
                        <ul>{this.state.errors.map(error => <li>{error}</li>)}</ul>
                    </div>
                </ConfirmPopup>
                <ConfirmPopup
                    onShow={() => {
                        this.editNameInput.handleChange(String(this.state.editing.name), true);
                        this.editNameInput.focus();
                    }}
                    onHide={() => {
                        this.editNameInput.reset();
                        this.resetKeyboard();
                    }}
                    onConfirmed={() => this.validateEdit()}
                    title={`Kunden "${this.state.editing.name}" bearbeiten`}
                    ref={popup => this.editPopup = popup}>
                    <div className='add-customer-popup'>
                        <div>
                            <label htmlFor='edit-customer-popup-name'>Name</label>
                            <VKeyboardTextInputContainer type='text'
                                id='edit-customer-popup-name'
                                ref={input => this.editNameInput = input}
                                placeholder='z.B. Brucker'
                                onFocus={e => this.resetErrors()}
                            ></VKeyboardTextInputContainer>
                        </div>
                        <ul>{this.state.errors.map(error => <li>{error}</li>)}</ul>
                    </div>
                </ConfirmPopup>
                <ConfirmPopup onConfirmed={() => this.props.onCustomerDeleted(this.state.deletion.id)} title='Wirklich löschen?' ref={popup => this.deletePopup = popup} confirmText='Löschen'>
                    <div>
                        Soll '{this.state.deletion.name}' wirklich gelöscht werden?
                    </div>
                </ConfirmPopup>
                <div className='column full-height broad'>
                    <div className='panel full-height'>
                        <table className='customer-details-list'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Summe</th>
                                    <th>Letzte Bestellung</th>
                                    <th>Letzte Zahlung</th>
                                    <th>Ersteller</th>
                                    <th>Erstellt am</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.customers.map(({id, name, total, lastOrder, lastPayment, createdBy, timestamp}) => <tr key={id}>
                                    <td>{name}</td>
                                    <td>{`${total >= 0 ? '+' : ''}${total.toFixed(2)} €`}</td>
                                    <td>{lastOrder ? formatter.format(lastOrder) : 'Nie'}</td>
                                    <td>{lastPayment ? formatter.format(lastPayment) : 'Nie'}</td>
                                    <td>{createdBy}</td>
                                    <td>{formatter.format(timestamp)}</td>
                                    <td><button onClick={() => this.editCustomer(id, name)}>Bearbeiten</button></td>
                                    <td><button onClick={() => this.deleteCustomer(id, name)}>Löschen</button></td>
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

CustomerScreen.propTypes = {
    customers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
        lastOrder: PropTypes.number.isRequired,
        lastPayment: PropTypes.number.isRequired,
        createdBy: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired
    })).isRequired,
    loggedInUser: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }),
    onCustomerAdded: PropTypes.func.isRequired,
    onCustomerDeleted: PropTypes.func.isRequired,
    loadCustomers: PropTypes.func.isRequired,
    updateKeyboardTarget: PropTypes.func.isRequired
}