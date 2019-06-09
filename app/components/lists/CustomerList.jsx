import React from "react";
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';
export const CustomerList = ({ customers }) => 
    <ul className="customer-list flex-list">
        {
            customers.map(customer => 
                <li key = {customer.id}>
                    <NavLink
                        to = {`/${customer.id}`}
                        activeClassName = 'active'
                    >
                        {customer.name}
                    </NavLink>
                </li>)
        }
    </ul>;

CustomerList.propTypes = {
    customers: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
    })),
};