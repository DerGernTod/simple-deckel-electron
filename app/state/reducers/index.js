import { combineReducers } from "redux";
import { products } from "./products";
import { customers } from "./customers";
import { users } from "./users";
import { status } from "./status";
import { items } from "./items";
import { payments } from "./payments";

export const rootReducer = combineReducers({
    products,
    customers,
    users,
    items,
    payments,
    status
});