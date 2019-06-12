import React from 'react';
import PropTypes from 'prop-types';

export const CartProductListItem = (props) => 
<React.Fragment>
    <li key={props.product.id} onClick={e => props.onClick(e, props.product)} className={`cat-${props.product.category}`}>
        <div>{props.product.name}</div>
        <div>{props.product.price.toFixed(2)} €</div>
    </li>
</React.Fragment>;

CartProductListItem.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired
};