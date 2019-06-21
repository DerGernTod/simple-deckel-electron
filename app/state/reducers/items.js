import { CATEGORIES } from "../../constants";
import { ITEMS_ADD, ITEMS_LIST } from "../actions";

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
    offset: 0,
    remainingPrev: 0,
    remainingNext: 0
}

export function items(state = initialState, action) {
    switch(action.type) {
        case ITEMS_ADD: 
            return {
                ...state,
                list: action.payload.list,
                remainingNext: action.payload.remainingNext,
                remainingPrev: action.payload.remainingPrev
            };
        case ITEMS_LIST:
            return {
                ...state,
                list: action.payload.list,
                remainingNext: action.payload.remainingNext,
                remainingPrev: action.payload.remainingPrev
            };
    }
    return state;
}