import { PRODUCT_ADD, PRODUCT_DELETE, PRODUCT_UPDATE } from "../actions";

let nextProductId = 0;

export function addProduct(name, category, price) {
    return {
        type: PRODUCT_ADD,
        payload: {
            id: nextProductId++,
            name, 
            category, 
            price
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