import Dexie from 'dexie';
import { initialUserState } from './reducers/users';

const db = new Dexie('db-name');
db.version(4).stores({
    customers: 'id++, name, timestamp, createdBy, total, lastOrder, lastPayment',
    users: 'id++, name, password, timestamp, createdBy',
    products: 'id++, name, price, category, timestamp, createdBy',
    items: 'id++, name, amount, price, category, timestamp, customerId, isPaid',
    payments: 'id++, amount, timestamp, customerId'
});

db.on("populate", () => {
    initialUserState.list.forEach(user => {
        db.users.add(user);
    });
});

export const DataBase = db;
