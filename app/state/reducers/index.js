import { combineReducers } from "redux";
import { products } from "./products";
import { customers } from "./customers";

export const rootReducer = combineReducers({
    products,
    customers
});