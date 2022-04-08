import { PAYMENT_LIST, PAYMENT_ADD, CUSTOMER_CLEAR, PAYMENT_LIST_BY_DATE } from "../actions";

const initialState = {
    list: [{
        id: 0,
        amount: 22.30,
        createdBy: 0,
        timestamp: 1560461260985
    }],
    remainingNext: 0,
    remainingPrev: 0
}

export function payments(state = initialState, action) {
    switch(action.type) {
        case PAYMENT_ADD:
        case PAYMENT_LIST:
        case PAYMENT_LIST_BY_DATE:
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
    }
    return state;
}