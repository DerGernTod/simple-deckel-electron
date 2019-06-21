import { PAYMENT_ADD, STATUS_LOADING, STATUS_SAVE_COMPLETE, PAYMENT_LIST } from "../actions";
import { DataBase } from "../db";
import { DB_LIMITS } from "../../constants";

export function loadPayments(customerId, offset = 0, limit = 0) {
    return async dispatch => {
        dispatch({
            type: STATUS_LOADING
        });
        try {
            const payments = await DataBase.table('payments').where('customerId').equals(customerId).reverse().sortBy('timestamp');
            dispatch({
                type: ITEMS_LIST,
                payload: payments.reduce((payload, payment, curIndex) => {
                    // skip all indizes before offset
                    if (curIndex < offset) {
                        return payload;
                    }
                    // skip all following payments in case a limit is set and we reached it, and increase "remainingNext"
                    if (limit && payload.list.length >= limit) {
                        payload.remainingPrev++;
                        return payload;
                    }
                    payload.list.push(payment);
                    return payload;
                }, { remainingNext: offset, remainingPrev: 0, list: [] })
            })
        } finally {
            dispatch({ type: STATUS_SAVE_COMPLETE });
        }
    };
}

export function addPayment(customerId, amount, createdBy) {
    return (dispatch) => {
        dispatch({
            type: STATUS_LOADING
        });
        DataBase.transaction('rw', DataBase.customers, DataBase.payments, DataBase.items, async () => {
            const timestamp = Date.now();
            await DataBase.table('payments').add({ amount, customerId, timestamp, createdBy });
            const customer = await DataBase.table('customers').get(customerId);
            const newTotal = customer.total + amount;
            await DataBase.table('customers').update(customerId, { total: newTotal, lastPayment: timestamp });
            const items = await DataBase.table('items').where('customerId').equals(customerId).toArray();
            const bulkPutResult = await DataBase.table('items').bulkPut(items.map(item => ({...item, isPaid: true })));
            console.log(bulkPutResult);
            const customerPayments = await DataBase.table('payments').where('customerId').equals(customerId).reverse().sortBy('timestamp');
            dispatch({
                type: PAYMENT_ADD,
                payload: {
                    id: customerId,
                    list: customerPayments.slice(0, DB_LIMITS),
                    remainingNext: 0,
                    remainingPrev: Math.max(0, customerPayments.length - DB_LIMITS),
                    total: newTotal
                }
            });
        }).catch(error => {
            alert('Fehler beim Ausführen der Datenbank-Transaktion: ' + error.message);
            console.error(error);
        }).then(() => dispatch({ type: STATUS_SAVE_COMPLETE }));
    };
}
