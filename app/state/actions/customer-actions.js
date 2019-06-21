import { CUSTOMER_ADD, CUSTOMER_DELETE, CUSTOMER_UPDATE, CUSTOMER_ITEMS_ADD, CUSTOMER_PAYMENT_ADD, CUSTOMER_ITEMS_CLEAR, STATUS_LOADING, STATUS_SAVE_COMPLETE, CUSTOMER_LOAD } from "../actions";
import { DataBase } from "../db";

export function addCustomer(name, createdBy) {
    return (dispatch) => {
        dispatch({
            type: STATUS_LOADING
        });
        DataBase.table('customers').add({
            name,
            createdBy,
            total: 0,
            timestamp: Date.now()
        })
            .then(id => dispatch({
                type: CUSTOMER_ADD,
                payload: {
                    id,
                    name,
                    items: [],
                    payments: [],
                    total: 0,
                    createdBy,
                    timestamp: Date.now()
                }
            }))
            .finally(() => dispatch({ type: STATUS_SAVE_COMPLETE }));
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
            .then(customersTable => Promise.all(customersTable.reduce((promises, customer) => {
                const customerPromise = Promise.all([
                    DataBase.table('items').where('customerId').equals(customer.id).reverse().sortBy('timestamp'),
                    DataBase.table('payments').where('customerId').equals(customer.id).reverse().sortBy('timestamp')
                ]).then(([items, payments]) => {
                    customer.items = items;
                    customer.payments = payments;
                    return customer;
                });
                promises.push(customerPromise);
                return promises;
            }, [])))
            .then(customersTable => dispatch({
                type: CUSTOMER_LOAD,
                payload: {
                    list: customersTable
                }
            }))
            .catch(e => console.error(e))
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

export function addItems(customerId, items) {
    return (dispatch) => {
        dispatch({
            type: STATUS_LOADING
        });
        const timestamp = Date.now();
        let customerTotal = 0;
        DataBase.table('items').bulkAdd(items.map(({name, amount, price, category}) => {
            const newPrice = price * amount;
            customerTotal -= newPrice;
            return {
                name,
                amount,
                price: newPrice,
                category,
                timestamp,
                customerId
            };
        }))
        .then(() => DataBase.table('customers').get(customerId))
        .then(customer => Promise.all([
            customer.total - customerTotal, 
            DataBase.table('customers').update(customerId, {total: customer.total - customerTotal})
        ]))
        .then(([newTotal]) => Promise.all([
            newTotal,
            DataBase.table('items').where('customerId').equals(customerId).reverse().sortBy('timestamp')
        ]))
        .then(([newTotal, items]) => dispatch({
            type: CUSTOMER_ITEMS_ADD,
            payload: {
                id: customerId,
                items,
                total: newTotal
            }
        }))
        .finally(() => dispatch({ type: STATUS_SAVE_COMPLETE }));
    };
}

export function addPayment(customerId, amount, createdBy) {
    return {
        type: CUSTOMER_PAYMENT_ADD,
        payload: {
            id: customerId,
            amount,
            createdBy
        }
    };
}

export function clearAllTransactions(customerId) {
    return {
        type: CUSTOMER_ITEMS_CLEAR,
        payload: {
            id: customerId
        }
    };
}