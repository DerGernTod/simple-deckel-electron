import React from "react";
import PropTypes from "prop-types";
import { Item } from "../Item"; 

export const ItemList = ({ items, onItemClick }) => 
    <ul className="item-list flex-list">
        {
            items.map(item => 
                <Item
                    key = {item.id}
                    name = {item.name}
                    price = {item.price}
                    category = {item.category}
                    amount = {item.amount}
                    onClick = {() => onItemClick(item.id)}
                />)
        }
    </ul>;

ItemList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
    })),
    onItemClick: PropTypes.func.isRequired
};