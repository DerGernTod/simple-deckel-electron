import React from 'react';
import { Popup } from "./Popup";
import PropTypes from "prop-types";
import { CATEGORIES } from '../../../constants';
import { CartProductListItem } from '../../list-items/CartProductListItem';
import { CartItem } from '../../list-items/CartItem';
export class CartPopup extends Popup {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            cart: []
        };
    }
    hide() {
        super.hide();
        this.setState({
            cart: []
        });
    }
    confirm() {
        this.props.onConfirmed(Number(this.props.customerId), this.state.cart.slice());
        this.hide();
    }
    getButtons() {
        return (
            <div>
                <button onClick={() => this.hide()}>Abbrechen</button>
                <button onClick={() => this.confirm()}>Bestätigen</button>
            </div>
        );
    }
    handleProductClick(addedProduct) {
        const cart = this.state.cart;
        const foundProduct = cart.find(product => product.id === addedProduct.id);
        if (!foundProduct) {
            this.setState({
                cart: cart.concat([{
                    ...addedProduct,
                    amount: 1
                }])
            });
        } else {
            foundProduct.amount++;
            this.setState({
                cart: cart.slice()
            });
        }
    }
    handleCartItemClick(clickedProductId) {
        const cart = this.state.cart;
        const foundProductId = cart.findIndex(product => product.id === clickedProductId);
        if (foundProductId < 0) {
            return;
        }
        const cartCopy = cart.slice();
        const foundProduct = cartCopy[foundProductId];
        foundProduct.amount--;

        if (!foundProduct.amount) {
            cartCopy.splice(foundProductId, 1)
        }
        this.setState({
            cart: cartCopy
        });
    }
    getContent() {
        const lists = this.props.products.reduce((all, product) => {
            let drinkIndex = '';
            if (product.category === CATEGORIES.DRINKS) {
                drinkIndex = all.drinkIndex % 2 === 0 ? 'A' : 'B';
                all.drinksIndex++;
            }
            all[product.category + drinkIndex].push(product);
            return all;
        }, {
            [CATEGORIES.DRINKS + 'A']: [],
            [CATEGORIES.DRINKS + 'B']: [],
            [CATEGORIES.FOOD]: [],
            [CATEGORIES.MISC]: [],
            drinkIndex: 0
        });
        return (
            <div className='cart-popup'>
                <div className='available-products'>
                    <ul>
                        <li>Getränke</li>
                        {lists[CATEGORIES.DRINKS + 'A'].map(drink => 
                            <CartProductListItem
                                key={drink.id}
                                product={drink}
                                onClick={(e, prod) => this.handleProductClick(prod)} />)}
                    </ul>
                    <ul>
                        <li>Getränke</li>
                        {lists[CATEGORIES.DRINKS + 'B'].map(drink =>
                            <CartProductListItem
                                key={drink.id}
                                product={drink}
                                onClick={(e, prod) => this.handleProductClick(prod)} />)}
                    </ul>
                    <ul>
                        <li>Mahlzeiten</li>
                        {lists[CATEGORIES.FOOD].map(meal =>
                            <CartProductListItem
                                key={meal.id}
                                product={meal}
                                onClick={(e, prod) => this.handleProductClick(prod)} />)}
                    </ul>
                    <ul>
                        <li>Sonstiges</li>
                        {lists[CATEGORIES.MISC].map(misc =>
                            <CartProductListItem
                                key={misc.id}
                                product={misc}
                                onClick={(e, prod) => this.handleProductClick(prod)} />)}
                    </ul>
                </div>
                <ul className='cart' ref={list => this.cart = list}>
                    {this.state.cart.map(product => <CartItem key={product.id} name={product.name} category={product.category} onClick={() => this.handleCartItemClick(product.id)} amount={product.amount} id={product.id} />)}
                    <li>Summe: {this.state.cart.reduce((sum, product) => sum + product.price * product.amount, 0).toFixed(2)} €</li>
                </ul>
            </div>
        );
    }
}

CartPopup.propTypes = {
    ...Popup.propTypes,
    onConfirmed: PropTypes.func,
    customerId: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    })).isRequired
};