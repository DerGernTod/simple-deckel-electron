import { ITEMS_ADD, STATUS_LOADING, STATUS_SAVE_COMPLETE, ITEMS_LIST } from "../actions";
import { DataBase } from "../db";

export function loadItems(customerId, offset = 0, limit = 0) {
    return async dispatch => {
        dispatch({
            type: STATUS_LOADING
        });
        try {
            const items = await DataBase.table('items').where('customerId').equals(customerId).reverse().sortBy('timestamp');
            dispatch({
                type: ITEMS_LIST,
                payload: items.reduce((payload, item, curIndex) => {
                    // skip all indizes before offset
                    if (curIndex < offset) {
                        return payload;
                    }
                    // skip all following items in case a limit is set and we reached it, and increase "remainingNext"
                    if (limit && payload.list.length >= limit) {
                        payload.remainingPrev++;
                        return payload;
                    }
                    payload.list.push(item);
                    return payload;
                }, { remainingNext: offset, remainingPrev: 0, list: [] })
            })
        } finally {
            dispatch({ type: STATUS_SAVE_COMPLETE });
        }
    };
}

export function addItems(customerId, items) {
    return (dispatch) => {
        dispatch({
            type: STATUS_LOADING
        });
        DataBase.transaction('rw', DataBase.customers, DataBase.items, async () => {
            const timestamp = Date.now();
            let itemsTotal = 0;
            await DataBase.table('items').bulkAdd(items.map(({ name, amount, price, category }) => {
                const newPrice = price * amount;
                itemsTotal += newPrice;
                return {
                    name,
                    amount,
                    price: newPrice,
                    category,
                    timestamp,
                    customerId,
                    isPaid: false
                };
            }));
            const customer = await DataBase.table('customers').get(customerId);
            const newTotal = customer.total - itemsTotal;
            await DataBase.table('customers').update(customerId, { total: newTotal, lastOrder: Date.now() });
            const customerItems = await DataBase.table('items').where('customerId').equals(customerId).reverse().sortBy('timestamp');
            dispatch({
                type: ITEMS_ADD,
                payload: {
                    id: customerId,
                    list: customerItems.slice(0, 10),
                    remainingNext: 0,
                    remainingPrev: Math.max(0, customerItems.length - 10),
                    total: newTotal
                }
            });
        }).catch(error => {
            alert('Fehler beim Ausführen der Datenbank-Transaktion: ' + error.message);
        }).then(() => dispatch({ type: STATUS_SAVE_COMPLETE }));
    };
}
