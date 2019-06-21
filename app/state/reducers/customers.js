import { CUSTOMER_ADD, CUSTOMER_DELETE, CUSTOMER_UPDATE, CUSTOMER_SELECT, CUSTOMER_ITEMS_ADD, CUSTOMER_CLEAR, PAYMENT_ADD, CUSTOMER_LOAD, ITEMS_ADD } from '../actions';
import { CATEGORIES } from '../../constants';

const initialState = {
	list: [
		{
			id: 0,
			name: 'Hans Wurst',
			createdBy: 0,
			total: -13.5,
			timestamp: 1560461260985
		},
		{
			id: 1,
			name: 'Franz Ferdinand',
			createdBy: 0,
			total: 12.3,
			timestamp: 1560461260985
		}
	],
	nextItemId: 3,
	nextPaymentId: 1,
	nextCustomerId: 2
};

export const initialCustomerState = initialState;

export function customers(state = initialState, action) {
	switch (action.type) {
		case CUSTOMER_ADD:
			return {
				...state,
				list: [ ...state.list, 
					action.payload
				]
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
                    .map(customer => {
                        if (customer.id === action.payload.id) {
							customer.total = action.payload.total;
                            customer.items = action.payload.items;
                        }
                        return customer;
                    })
            };
        case CUSTOMER_CLEAR:
            return {
                ...state,
                list: state.list
                    .map(customer => (customer.id === action.payload.id)
                        ? {
                            ...customer,
							items: [],
							payments: [],
							total: 0
                        }
                        : customer)
			};
		case PAYMENT_ADD:
			return {
				...state,
				list: state.list.map(customer => {
					if (customer.id === action.payload.id) {
						const newPayment = {
							id: state.nextPaymentId++,
							timestamp: Date.now(),
							amount: action.payload.amount,
							createdBy: action.payload.createdBy
						};
						customer.items = customer.items.map(item => item.isPaid = true && item);
						customer.payments = [newPayment].concat(customer.payments);
						customer.total += action.payload.amount;
					}
					return customer;
				})
			};
		case CUSTOMER_LOAD:
			return {
				...state,
				list: action.payload.list
			};
		case ITEMS_ADD:
			return {
				...state,
				list: state.list.map(customer => {
					if (customer.id === action.payload.id) {
						return {
							...customer,
							total: action.payload.total
						};
					}
					return customer;
				})
			}
	}
	return state;
}
