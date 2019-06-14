import { CUSTOMER_ADD, CUSTOMER_DELETE, CUSTOMER_UPDATE, CUSTOMER_SELECT, CUSTOMER_ITEMS_ADD, CUSTOMER_ITEMS_CLEAR, CUSTOMER_PAYMENT_ADD } from '../actions';
import { CATEGORIES } from '../../constants';

const initialState = {
	list: [
		{
			id: 0,
			name: 'Hans Wurst',
			createdBy: 'Hans',
			payments: [],
			items: [
				{
					id: 0,
					name: 'Irgendwas',
					isPaid: false,
					createdBy: 'Hans',
					amount: 2,
					price: 13.5,
					category: CATEGORIES.MISC,
                    timestamp: 1560461260985
				}
			]
		},
		{
			id: 1,
			name: 'Franz Ferdinand',
			createdBy: 'Hans',
			payments: [{
                    id: 0,
                    amount: 22.30,
                    createdBy: 'Hans',
                    timestamp: 1560461260985
			}],
			items: [
				{
					id: 1,
					name: 'Anderes',
					isPaid: false,
					createdBy: 'Hans',
					amount: 4,
					price: 8.5,
					category: CATEGORIES.DRINKS,
                    timestamp: 1560461260985
				},
				{
					id: 2,
					name: 'Schon bezahlt',
					isPaid: true,
					createdBy: 'Hans',
					amount: 4,
					price: 1.5,
					category: CATEGORIES.DRINKS,
                    timestamp: 1560461260985
				}
			]
		}
	],
	nextItemId: 3,
	nextPaymentId: 1
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
            let nextItemId = state.nextItemId;
            const newItems = action.payload.items.map(item => {
                item.price *= item.amount;
				item.id = nextItemId++;
				item.timestamp = Date.now();
                return item;
            });
            return {
                ...state,
                nextItemId,
                list: state.list
                    .map(customer => {
                        if (customer.id === action.payload.id) {
                            customer.items = newItems.concat(customer.items);
                        }
                        return customer;
                    })
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
		case CUSTOMER_PAYMENT_ADD:
			return {
				...state,
				list: state.list.map(customer => {
					if (customer.id === action.payload.id) {
						const newPayment = {
							id: state.nextPaymentId++,
							timestamp: Date.now(),
							amount: action.payload.amount,
							createdBy: action.payload.id
						};
						customer.items = customer.items.map(item => item.isPaid = true && item);
						customer.payments = [newPayment].concat(customer.payments);
					}
					return customer;
				})
			};
	}
	return state;
}
