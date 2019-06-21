import { connect } from "react-redux";
import { CustomerScreen } from "../../components/screens/CustomerScreen";
import { addCustomer, deleteCustomer, loadCustomers } from "../../state/actions/customer-actions";
import { changeKeyboardTarget } from "../../state/actions/status-actions";

const mapStateToProps = (state) => {
    const customers = state.customers.list.map(({id, name, total, items, payments, createdBy, timestamp}) => ({
            id,
            name,
            total,
            items,
            createdBy: state.users.list.find(user => user.id === createdBy).name,
            timestamp,
            lastOrder: items.reduce((maxTimestamp, curItem) => Math.max(maxTimestamp, curItem.timestamp), 0),
            lastPayment: payments.reduce((maxTimestamp, curItem) => Math.max(maxTimestamp, curItem.timestamp), 0)
        }));
    return {
        customers,
        loggedInUser: state.status.loggedInUser
    };
};

const mapDispatchToProps = (dispatch) => ({
    onCustomerAdded: (name, createdBy) => dispatch(addCustomer(name, createdBy)),
    onCustomerDeleted: (customerId) => dispatch(deleteCustomer(customerId)),
    loadCustomers: () => dispatch(loadCustomers()),
    updateKeyboardTarget: (target, callback, value) => dispatch(changeKeyboardTarget(target, callback, value)),
});

export const CustomerScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerScreen);