import { combineReducers } from "redux";
import { products } from "./products";
import { customers } from "./customers";
import { users } from "./users";

export const rootReducer = combineReducers({
    products,
    customers,
    users
});