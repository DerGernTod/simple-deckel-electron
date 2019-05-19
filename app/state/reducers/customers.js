import { CUSTOMER_ADD, CUSTOMER_DELETE, CUSTOMER_UPDATE, CUSTOMER_SELECT } from "../actions";
import { CATEGORIES } from "../../constants";

const initialState = {
    list: [{
        id: 0,
        name: 'Hans Wurst',
        items: [
            {
                id: 0,
                name: 'Irgendwas',
                amount: 2,
                price: 13.50,
                category: CATEGORIES.MISC
            }
        ]
    },
    {
        id: 1,
        name: 'Franz Ferdinand',
        items: [
            {
                id: 1,
                name: 'Anderes',
                amount: 4,
                price: 8.50,
                category: CATEGORIES.DRINKS
            }
        ]
    }],
    selectedId: -1
};

export function customers(state = initialState, action) {
    switch (action.type) {
        case CUSTOMER_ADD:
            return {
                ...state,
                list: [
                    ...state.list,
                    action.payload
                ]
            };
        case CUSTOMER_DELETE:
            return {
                ...state,
                list: state.list.filter(elem => elem.id != action.payload.id)
            };
        case CUSTOMER_UPDATE:
            return {
                ...state,
                list: state.list.map(customer => customer.id === action.payload.id ? action.payload : customer)
            };
        case CUSTOMER_SELECT:
            return {
                ...state,
                selectedId: action.payload.id
            };

    }
    return state;
}

