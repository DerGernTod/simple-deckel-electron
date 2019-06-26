import {PRODUCT_DELETE, PRODUCT_ADD, PRODUCT_UPDATE, PRODUCT_LOAD} from '../actions'
import { CATEGORIES } from '../../constants';
const initialState = {
    list: [{
        id: 0,
        name: 'Bier',
        price: 3.50,
        createdBy: 0,
        category: CATEGORIES.DRINKS,
        timestamp: 1560461260985
    }, {
        id: 1,
        name: 'Spaghetti',
        price: 6.50,
        createdBy: 0,
        category: CATEGORIES.FOOD,
        timestamp: 1560461260985
    }],
    nextProductId: 2
};

export const initialProductState = initialState;

export function products(state = initialState, action) {
    switch (action.type) {
        case PRODUCT_ADD:
            return {
                ...state, 
                list: state.list.concat([ action.payload ])
            };
        case PRODUCT_DELETE:
            return {
                ...state,
                list: state.list.filter(elem => elem.id != action.payload.id)
            };
        case PRODUCT_UPDATE:
            return {
                ...state,
                list: state.list.map(prod => prod.id === action.payload.id ? action.payload : prod)
            };
        case PRODUCT_LOAD:
            return {
                ...state,
                list: action.payload
            };
    }
    return state;
}

