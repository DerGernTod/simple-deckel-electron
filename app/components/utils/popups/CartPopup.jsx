import React from 'react';
import { Popup } from "./Popup";
import PropTypes from "prop-types";
import { CATEGORIES } from '../../../constants';
export class CartPopup extends Popup {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            errors: []
        };
    }
    getButtons() {
        return (
            <div>
                <button onClick={() => this.hide()}>Abbrechen</button>
                <button onClick={() => this.props.onConfirmed()}>Bestätigen</button>
            </div>
        );
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
                        {JSON.stringify(lists[CATEGORIES.DRINKS + 'A'])}
                    </ul>
                    <ul>
                        {JSON.stringify(lists[CATEGORIES.DRINKS + 'B'])}
                    </ul>
                    <ul>
                        {JSON.stringify(lists[CATEGORIES.FOOD])}
                    </ul>
                    <ul>
                        {JSON.stringify(lists[CATEGORIES.MISC])}
                    </ul>
                </div>
                <div>
                    <ul ref={list => this.cart = list}>

                    </ul>
                </div>
            </div>
        );
    }
}

CartPopup.propTypes = {
    ...Popup.propTypes,
    onConfirmed: PropTypes.func,
    customerId: PropTypes.number.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    })).isRequired
};