import { CUSTOMER_ADD, CUSTOMER_DELETE, CUSTOMER_UPDATE, CUSTOMER_SELECT, CUSTOMER_ITEMS_ADD, CUSTOMER_PAYMENT_ADD } from "../actions";

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

export function addItems(customerId, items) {
    return {
        type: CUSTOMER_ITEMS_ADD,
        payload: {
            id: customerId,
            items
        }
    };
}

export function addPayment(customerId, amount) {
    return {
        type: CUSTOMER_PAYMENT_ADD,
        payload: {
            id: customerId,
            amount
        }
    };
}