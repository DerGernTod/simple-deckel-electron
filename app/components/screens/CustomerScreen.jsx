import React from 'react';
import PropTypes from 'prop-types';
import { LoginPopupContainer } from '../../containers/utils/popups/login-popup-container';

export class CustomerScreen extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h1>hello customer screen</h1>
            </React.Fragment>
        );
    }
}

CustomerScreen.propTypes = {
    customers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
        lastOrder: PropTypes.number.isRequired,
        lastPayment: PropTypes.number.isRequired,
        createdBy: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired
    })).isRequired,
    loggedInUser: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.number.isRequired
    })
}