import React from "react";
import PropTypes from "prop-types";

export const User = ({ name, onDelete, onUpdate }) => 
    <li>
        {name}
    </li>;

User.propTypes = {
    name: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
};