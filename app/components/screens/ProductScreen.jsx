import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import { VKeyboardTextInputContainer } from "../../containers/utils/vkeyboard-text-input-container";
import { ConfirmPopup } from '../utils/popups/ConfirmPopup';
import { CATEGORIES } from '../../constants';
import { VKeyboardNumericInputContainer } from '../../containers/utils/vkeyboard-numeric-input-container';
export class ProductScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deletion: {
                id: -1,
                name: ''
            },
            newProductData: {
                name: '',
                price: 0,
                category: CATEGORIES.MISC
            },
            editing: {
                id: -1,
                name: '',
                price: 0,
                category: CATEGORIES.MISC
            },
            errors: []
        }
    }
    componentDidMount() {
        this.props.loadProducts();
    }
    showAddPopup() {
        this.addPopup.show();
    }
    onAddShow() {
        this.nameInput.focus();
    }
    onEditShow() {
        this.editPriceInput.handleChange(String(this.state.editing.price), true);
        this.editNameInput.handleChange(this.state.editing.name, true);
        this.editNameInput.focus();
    }
    deleteProduct(id, name) {
        this.setState({
            deletion: {
                id,
                name
            }
        });
        this.deletePopup.show();
    }
    editProduct(id, name, price, category) {
        this.setState({
            editing: {
                id,
                name,
                price,
                category
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
        this.props.onProductAdded(nameValue, this.priceInput.getValue(), this.state.newProductData.category, this.props.loggedInUser.id < 0 ? 0 : this.props.loggedInUser.id);
        this.props.updateKeyboardTarget('', () => void 0, '');
        this.priceInput.reset();
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
        this.props.onProductUpdated(this.state.editing.id, nameValue, this.editPriceInput.getValue(), this.state.editing.category, this.props.loggedInUser.id < 0 ? 0 : this.props.loggedInUser.id);
        this.props.updateKeyboardTarget('', () => void 0, '');
        this.editPriceInput.reset();
        this.editNameInput.reset();
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
        return (
            <React.Fragment>
                <ConfirmPopup onShow={() => this.onAddShow()} onHide={() => this.props.updateKeyboardTarget('', () => void 0, '')} onConfirmed={() => this.validateAdd()} title='Produkt hinzufügen' ref={popup => this.addPopup = popup} width="400px" height="350px">
                    <div className='add-product-popup'>
                        <div>
                            <label htmlFor='add-product-popup-name'>Name</label>
                            <VKeyboardTextInputContainer type='text'
                                id='add-product-popup-name'
                                ref={input => this.nameInput = input}
                                placeholder='z.B. Schnitzel'
                                onFocus={e => this.resetErrors()}
                            ></VKeyboardTextInputContainer>
                        </div>
                        <div>
                            <label htmlFor='add-product-popup-price'>Preis</label>
                            <VKeyboardNumericInputContainer
                                id='add-product-popup-price'
                                ref={input => this.priceInput = input}
                                type='number'
                                min='0'
                                max='1000'
                                step='0.1'
                                onFocus={e => this.resetErrors()}
                            ></VKeyboardNumericInputContainer>
                        </div>
                        <div>
                            <label htmlFor='add-product-popup-category'>Kategorie</label>
                            <select
                                id='add-product-popup-category'
                                value={this.state.newProductData.category}
                                onChange={(e) => this.setState({newProductData: {...this.state.newProductData, category: e.target.value}})}>
                                <option>{CATEGORIES.DRINKS}</option>
                                <option>{CATEGORIES.FOOD}</option>
                                <option>{CATEGORIES.MISC}</option>
                            </select>
                        </div>
                        <ul>{this.state.errors.map(error => <li>{error}</li>)}</ul>
                    </div>
                </ConfirmPopup>
                <ConfirmPopup onShow={() => this.onEditShow()}
                        onHide={() => this.props.updateKeyboardTarget('', () => void 0, '')}
                        onConfirmed={() => this.validateEdit()}
                        title={`${this.state.editing.name} bearbeiten`}
                        ref={popup => this.editPopup = popup} width="400px" height="350px">
                    <div className='add-product-popup'>
                        <div>
                            <label htmlFor='edit-product-popup-name'>Name</label>
                            <VKeyboardTextInputContainer type='text'
                                id='edit-product-popup-name'
                                ref={input => this.editNameInput = input}
                                placeholder='z.B. Schnitzel'
                                onFocus={e => this.resetErrors()}
                            ></VKeyboardTextInputContainer>
                        </div>
                        <div>
                            <label htmlFor='edit-product-popup-price'>Preis</label>
                            <VKeyboardNumericInputContainer
                                id='edit-product-popup-price'
                                ref={input => this.editPriceInput = input}
                                type='number'
                                min='0'
                                max='1000'
                                step='0.1'
                                onFocus={e => this.resetErrors()}
                            ></VKeyboardNumericInputContainer>
                        </div>
                        <div>
                            <label htmlFor='edit-product-popup-category'>Kategorie</label>
                            <select
                                id='edit-product-popup-category'
                                value={this.state.editing.category}
                                onChange={(e) => this.setState({editing: {...this.state.editing, category: e.target.value}})}>
                                <option>{CATEGORIES.DRINKS}</option>
                                <option>{CATEGORIES.FOOD}</option>
                                <option>{CATEGORIES.MISC}</option>
                            </select>
                        </div>
                        <ul>{this.state.errors.map(error => <li>{error}</li>)}</ul>
                    </div>
                </ConfirmPopup>
                <ConfirmPopup onConfirmed={() => this.props.onProductDeleted(this.state.deletion.id)} title='Wirklich löschen?' ref={popup => this.deletePopup = popup} confirmText='Löschen'>
                    <div>
                        Soll '{this.state.deletion.name}' wirklich gelöscht werden?
                    </div>
                </ConfirmPopup>
                <div className='column full-height broad'>
                    <div className='panel full-height'>
                        <table className='product-details-list'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Preis</th>
                                    <th>Kategorie</th>
                                    <th>Ersteller</th>
                                    <th>Erstellt am</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.products.map(({id, name, price, category, createdBy, timestamp}) => <tr key={id} className={`cat-${category}`}>
                                    <td>{name}</td>
                                    <td>{price.toFixed(2)} €</td>
                                    <td>{category}</td>
                                    <td>{createdBy}</td>
                                    <td>{formatter.format(timestamp)}</td>
                                    <td><button onClick={() => this.editProduct(id, name, price, category)}>Bearbeiten</button></td>
                                    <td><button onClick={() => this.deleteProduct(id, name)}>Löschen</button></td>
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

ProductScreen.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        createdBy: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired
    })).isRequired,
    loggedInUser: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }),
    onProductAdded: PropTypes.func.isRequired,
    onProductDeleted: PropTypes.func.isRequired,
    onProductUpdated: PropTypes.func.isRequired,
    updateKeyboardTarget: PropTypes.func.isRequired,
    loadProducts: PropTypes.func.isRequired
}