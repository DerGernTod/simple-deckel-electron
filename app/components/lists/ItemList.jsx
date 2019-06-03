import React from "react";
import PropTypes from "prop-types";
import { Item } from "../utils/Item"; 

export const ItemList = ({ items, onItemClick }) => {
    const sum = items.reduce((sum, item) => sum - item.price, 0);
    return (
        <ul className="item-list flex-list">
            {
                items.map(item => 
                    <Item
                        key = {item.id}
                        name = {item.name}
                        price = {-item.price}
                        category = {item.category}
                        amount = {item.amount}
                        onClick = {() => onItemClick(item.id)}
                    />)
            }
            
            <li className="sum">
                <div>Summe</div><div>{sum > 0 ? '+' : ''}{sum} €</div>
            </li>
        </ul>
    );
    };

ItemList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
    })),
    onItemClick: PropTypes.func.isRequired
};