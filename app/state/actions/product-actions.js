import { PRODUCT_ADD, PRODUCT_DELETE, PRODUCT_UPDATE } from "../actions";

export function addProduct(name, price, category, createdBy) {
    return {
        type: PRODUCT_ADD,
        payload: {
            name, 
            category, 
            price,
            createdBy
        }
    };
}

export function deleteProduct(id) {
    return {
        type: PRODUCT_DELETE,
        payload: {
            id
        }
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