import { CUSTOMER_ADD, CUSTOMER_DELETE, CUSTOMER_UPDATE, PAYMENT_ADD, CUSTOMER_CLEAR, STATUS_LOADING, STATUS_SAVE_COMPLETE, CUSTOMER_LOAD } from "../actions";
import { DataBase } from "../db";

export function addCustomer(name, createdBy) {
    return async (dispatch) => {
        dispatch({
            type: STATUS_LOADING
        });
        try {
            const id = await DataBase.table('customers').add({
                name,
                createdBy,
                total: 0,
                lastOrder: 0,
                lastPayment: 0,
                timestamp: Date.now()
            });
            dispatch({
                type: CUSTOMER_ADD,
                payload: {
                    id,
                    name,
                    total: 0,
                    lastOrder: 0,
                    lastPayment: 0,
                    createdBy,
                    timestamp: Date.now()
                }
            });
        } finally {
            dispatch({ type: STATUS_SAVE_COMPLETE });
        }
    };
}

export function loadCustomers(limit = 0, offset = 0) {
    return (dispatch) => {
        dispatch({
            type: STATUS_LOADING
        });
        const dbPromise = DataBase.table('customers').orderBy('name').offset(offset);
        if (limit > 0) {
            dbPromise = dbPromise.limit(limit);
        }
        dbPromise.toArray()
            .then(customersTable => dispatch({
                type: CUSTOMER_LOAD,
                payload: {
                    list: customersTable
                }
            }))
            .finally(() => dispatch({ type: STATUS_SAVE_COMPLETE }));
    }

}

export function deleteCustomer(id) {
    return (dispatch) => {
        dispatch({
            type: STATUS_LOADING
        });
        DataBase.table('customers').delete(id)
        .then(() => Promise.all([
            DataBase.table('items').where('customerId').equals(id).delete(),
            DataBase.table('payments').where('customerId').equals(id).delete()
        ]))
        .then(() => {
            dispatch({
                type: CUSTOMER_DELETE,
                payload: {
                    id
                }
            });
        })
        .finally(() => dispatch({ type: STATUS_SAVE_COMPLETE }));
        
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

export function clearAllTransactions(customerId) {
    return (dispatch) => {
        dispatch({
            type: STATUS_LOADING
        });
        DataBase.transaction('rw', DataBase.items, DataBase.customers, DataBase.payments, async () => {
            try {

                await DataBase.table('items').where('customerId').equals(customerId).delete(),
                await DataBase.table('payments').where('customerId').equals(customerId).delete()
                await DataBase.table('customers').update('customerId', { total: 0 });
            } finally {
                dispatch({ type: STATUS_SAVE_COMPLETE });
            }
        });
    };
}