import React from "react";
import PropTypes from "prop-types";

export const Item = ({ name, amount, price, category, onClick }) => 
    <li onClick = {onClick}>
        {category}: {amount} {name} für {price} €
    </li>;

Item.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};