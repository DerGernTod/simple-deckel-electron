import React from "react";
import PropTypes from "prop-types";

export const Product = ({ category, name, price, onDelete, onUpdate }) => 
    <li>
        {category}/{name}: {price}
    </li>;

Product.propTypes = {
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
};