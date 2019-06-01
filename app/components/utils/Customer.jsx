import React from "react";
import PropTypes from "prop-types";

export const Customer = ({ name, onClick }) => 
    <li onClick = {onClick}>
        {name}
    </li>;

Customer.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};