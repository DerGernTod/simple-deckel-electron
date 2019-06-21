import Dexie from 'dexie';
import { initialUserState } from './reducers/users';

const db = new Dexie('db-name');
db.version(1).stores({
    customers: 'id++, name, timestamp, createdBy',
    users: 'id++, name, password, timestamp, createdBy',
    products: 'id++, name, price, category, timestamp, createdBy',
    items: 'id++, name, amount, price, category, timestamp, customerId',
    payments: 'id++, amount, timestamp, customerId'
});
db.version(2).stores({
    customers: 'id++, name, timestamp, createdBy, total',
    users: 'id++, name, password, timestamp, createdBy',
    products: 'id++, name, price, category, timestamp, createdBy',
    items: 'id++, name, amount, price, category, timestamp, customerId',
    payments: 'id++, amount, timestamp, customerId'
}).upgrade(tx => {
    return tx.customers.toCollection().modify(customer => {
        customer.total = 0;
    });
});

db.on("populate", () => {
    initialUserState.list.forEach(user => {
        db.users.add(user);
    });
});

export const DataBase = db;
