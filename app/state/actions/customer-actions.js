import { CUSTOMER_ADD, CUSTOMER_DELETE, CUSTOMER_UPDATE, CUSTOMER_SELECT } from "../actions";

let nextCustomerId = 0;

export function addCustomer(name) {
    return {
        type: CUSTOMER_ADD,
        payload: {
            id: nextCustomerId++,
            name,
            items: []
        }
    };
}

export function deleteCustomer(id) {
    return {
        type: CUSTOMER_DELETE,
        payload: {
            id
        }
    };
}

export function updateCustomer(id, name, items) {
    return {
        type: CUSTOMER_UPDATE,
        payload: {
            id, 
            name, 
            items
        }
    };
}

export function selectCustomer(id) {
    return {
        type: CUSTOMER_SELECT,
        payload: {
            id
        }
    };
}