import { PRODUCT_ADD, PRODUCT_DELETE, PRODUCT_UPDATE, STATUS_LOADING, STATUS_SAVE_COMPLETE, PRODUCT_LOAD } from "../actions";
import { DataBase } from "../db";

export function loadProducts() {
    return (dispatch) => {
        dispatch({
            type: STATUS_LOADING
        });
        DataBase.table('products').toArray()
        .then(products => dispatch({
            type: PRODUCT_LOAD,
            payload: products
        }))
        .finally(() => dispatch({ type: STATUS_SAVE_COMPLETE }));
    }
}

export function addProduct(name, price, category, createdBy) {
    return (dispatch) => {
        dispatch({
            type: STATUS_LOADING
        });
        const timestamp = Date.now();
        DataBase.table('products').add({
            name,
            price,
            category,
            createdBy,
            timestamp
        })
        .then(id => dispatch({
            type: PRODUCT_ADD,
            payload: {
                id,
                name, 
                category, 
                price,
                createdBy,
                timestamp
            }
        }))
        .finally(() => dispatch({ type: STATUS_SAVE_COMPLETE }));
    };
}

export function deleteProduct(id) {
    return (dispatch) => {
        dispatch({
            type: STATUS_LOADING
        });
        DataBase.table('products').delete(id)
        .then(() => dispatch({
            type: PRODUCT_DELETE,
            payload: {
                id
            }
        }));
    };
}

export function updateProduct(id, name, category, price) {
    return {
        type: PRODUCT_UPDATE,
        payload: {
            id, 
            name, 
            category, 
            price
        }
    };
}