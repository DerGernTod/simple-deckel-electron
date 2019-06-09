import {PRODUCT_DELETE, PRODUCT_ADD, PRODUCT_UPDATE} from '../actions'
import { CATEGORIES } from '../../constants';
const initialState = {
    list: [{
        id: 0,
        name: 'Bier',
        price: 3.50,
        createdBy: 'Hans',
        category: CATEGORIES.DRINKS
    }, {
        id: 1,
        name: 'Spaghetti',
        price: 6.50,
        createdBy: 'Hans',
        category: CATEGORIES.FOOD
    }],
    nextProductId: 2
};

export function products(state = initialState, action) {
    switch (action.type) {
        case PRODUCT_ADD:
            return [
                ...state, 
                action.payload
            ];
        case PRODUCT_DELETE:
            return state.filter(elem => elem.id != action.payload.id);
        case PRODUCT_UPDATE:
            return state.map(prod => prod.id === action.payload.id ? action.payload : prod);
    }
    return state;
}

