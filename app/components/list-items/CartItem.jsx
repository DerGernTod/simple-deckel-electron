import React from 'react';
import PropTypes from 'prop-types';

export const CartItem = ({id, name, category, amount, onClick}) => 
<React.Fragment>
    <li onClick={onClick} className={`cart-item cat-${category}`} key={id}>{amount} {name}</li>
</React.Fragment>;

CartItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    onClick: PropTypes.func
};