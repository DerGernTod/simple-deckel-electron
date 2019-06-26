import Dexie from 'dexie';

const db = new Dexie('db-name');
db.version(4).stores({
    customers: 'id++, name, timestamp, createdBy, total, lastOrder, lastPayment',
    users: 'id++, name, password, timestamp, createdBy',
    products: 'id++, name, price, category, timestamp, createdBy',
    items: 'id++, name, amount, price, category, timestamp, customerId, isPaid',
    payments: 'id++, amount, timestamp, customerId'
});

export const DataBase = db;
