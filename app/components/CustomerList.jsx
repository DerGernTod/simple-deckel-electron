import React from "react";
import PropTypes from "prop-types";
import { Customer } from "./Customer";
export const CustomerList = ({ customers, onCustomerSelect }) => 
    <ul>
        {
            customers.map(customer => 
                <Customer
                    key = {customer.id}
                    name = {customer.name}
                    onClick = {() => onCustomerSelect(customer.id)}
                />)
        }
    </ul>;

CustomerList.propTypes = {
    customers: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
    })),
    onCustomerSelect: PropTypes.func.isRequired
};