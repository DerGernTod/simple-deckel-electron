import React from "react";
import PropTypes from "prop-types";
import { Product } from "../utils/Product"; 
export const ProductList = ({ products, onAdd }) => 
    <ul>
        {
            products.map(product => 
                <Product
                    key = {product.id}
                    name = {product.name}
                    category = {product.category}
                    price = {product.price}
                    onDelete = {() => void 0}
                    onUpdate = {() => void 0} />)
        }
    </ul>;

ProductList.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        category: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    })).isRequired,
    onAdd: PropTypes.func.isRequired
};