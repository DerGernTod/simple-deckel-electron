import React from "react";
import PropTypes from "prop-types";
import { Item } from "../utils/Item"; 

export const ItemList = ({ items, onItemClick }) => {
    const entries = [];
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        if (!item.isPaid) {
            entries.push(<Item
                key = {item.id}
                name = {item.name}
                price = {-item.price}
                category = {item.category}
                amount = {item.amount}
                onClick = {() => onItemClick(item.id)}
            />);
        }
    }

    return (
        <ul className="item-list flex-list">
            {entries}
        </ul>
    );
};

ItemList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
    })),
    payments: PropTypes.arrayOf(PropTypes.shape({
        amount: PropTypes.number.isRequired
    })),
    onItemClick: PropTypes.func.isRequired
};