import React from "react";
import PropTypes from "prop-types";

export const Item = ({ name, amount, price, category, onClick }) => 
    <li onClick = {onClick} className={`item cat-${category}`}>
        <div>{amount} {name}</div><div>{price.toFixed(2)} €</div>
    </li>;

Item.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};