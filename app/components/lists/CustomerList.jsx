import React from "react";
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';
export class CustomerList extends React.Component {
    componentDidMount() {
        this.props.loadCustomers();
    }
    render() {
        return (
            <ul className="customer-list flex-list">
                {
                    this.props.customers.map(customer => 
                        <li key = {customer.id}>
                            <NavLink
                                to = {`/overview/${customer.id}`}
                                activeClassName = 'active'
                            >
                                {customer.name}
                            </NavLink>
                        </li>)
                }
            </ul>
        );
    }
}

CustomerList.propTypes = {
    customers: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
    })),
    loadCustomers: PropTypes.func.isRequired
};