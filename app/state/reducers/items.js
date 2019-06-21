import { CATEGORIES } from "../../constants";
import { ITEMS_ADD, ITEMS_LIST, CUSTOMER_CLEAR, PAYMENT_ADD } from "../actions";

const initialState = {
    list: [
        {
            id: 1,
            name: 'Anderes',
            isPaid: false,
            amount: 4,
            price: 8.5,
            category: CATEGORIES.DRINKS,
            timestamp: 1560461260985
        },
        {
            id: 2,
            name: 'Schon bezahlt',
            isPaid: true,
            amount: 4,
            price: 1.5,
            category: CATEGORIES.DRINKS,
            timestamp: 1560461260985
        }
    ],
    remainingPrev: 0,
    remainingNext: 0
}

export function items(state = initialState, action) {
    switch(action.type) {
        case ITEMS_LIST:
        case ITEMS_ADD: 
            return {
                ...state,
                list: action.payload.list,
                remainingNext: action.payload.remainingNext,
                remainingPrev: action.payload.remainingPrev
            };
        case CUSTOMER_CLEAR:
            return {
                ...state,
                list: [],
                remainingNext: 0,
                remainingPrev: 0
            };
        case PAYMENT_ADD:
            return {
                ...state,
                list: state.list.map(item => ({...item, isPaid: true})),
                remainingNext: 0,
                remainingPrev: 0
            }
    }
    return state;
}