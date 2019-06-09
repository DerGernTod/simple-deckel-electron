import { CUSTOMER_ADD, CUSTOMER_DELETE, CUSTOMER_UPDATE, CUSTOMER_SELECT, CUSTOMER_ITEMS_ADD, CUSTOMER_ITEMS_CLEAR } from '../actions';
import { CATEGORIES } from '../../constants';

const initialState = {
	list: [
		{
			id: 0,
			name: 'Hans Wurst',
			createdBy: 'Hans',
			items: [
				{
					id: 0,
					name: 'Irgendwas',
					isPaid: false,
					createdBy: 'Hans',
					amount: 2,
					price: 13.5,
					category: CATEGORIES.MISC
				}
			]
		},
		{
			id: 1,
			name: 'Franz Ferdinand',
			createdBy: 'Hans',
			items: [
				{
					id: 1,
					name: 'Anderes',
					isPaid: false,
					createdBy: 'Hans',
					amount: 4,
					price: 8.5,
					category: CATEGORIES.DRINKS
				},
				{
					id: 2,
					name: 'Schon bezahlt',
					isPaid: true,
					createdBy: 'Hans',
					amount: 4,
					price: 1.5,
					category: CATEGORIES.DRINKS
				}
			]
		}
	],
    selectedId: -1,
    nextId: 3
};

export function customers(state = initialState, action) {
	switch (action.type) {
		case CUSTOMER_ADD:
			return {
				...state,
				list: [ ...state.list, action.payload ]
			};
		case CUSTOMER_DELETE:
			return {
				...state,
				list: state.list.filter((elem) => elem.id != action.payload.id)
			};
		case CUSTOMER_UPDATE:
			return {
				...state,
				list: state.list.map((customer) => (customer.id === action.payload.id ? action.payload : customer))
			};
		case CUSTOMER_SELECT:
			return {
				...state,
				selectedId: action.payload.id
            };
        case CUSTOMER_ITEMS_ADD:
            return {
                ...state,
                list: state.list
                    .map(customer => (customer.id === action.payload.id) 
                        ? {
                            ...customer,
                            items: customer.items.concat(action.payload.items)
                        } 
                        : customer)
            };
        case CUSTOMER_ITEMS_CLEAR:
            return {
                ...state,
                list: state.list
                    .map(customer => (customer.id === action.payload.id)
                        ? {
                            ...customer,
                            items: []
                        }
                        : customer)
            };
	}
	return state;
}
