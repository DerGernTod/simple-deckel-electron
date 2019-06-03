import { combineReducers } from "redux";
import { products } from "./products";
import { customers } from "./customers";
import { users } from "./users";
import { status } from "./status";

export const rootReducer = combineReducers({
    products,
    customers,
    users,
    status
});