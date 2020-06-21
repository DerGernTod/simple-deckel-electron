import { connect } from "react-redux";
import { CustomerScreen } from "../../components/screens/CustomerScreen";
import { addCustomer, deleteCustomer, loadCustomers, updateCustomer } from "../../state/actions/customer-actions";
import { changeKeyboardTarget } from "../../state/actions/status-actions";

const mapStateToProps = (state) => {
    const customers = state.customers.list.map(({id, name, total, createdBy, timestamp, lastOrder, lastPayment}) => {
        const creator = state.users.list.find(user => user.id === createdBy);

        return {
            id,
            name,
            total,
            createdBy: creator ? creator.name : "Unbekannt",
            timestamp,
            lastOrder,
            lastPayment
        };
    });
    return {
        customers,
        loggedInUser: state.status.loggedInUser
    };
};

const mapDispatchToProps = (dispatch) => ({
    onCustomerAdded: (name, createdBy) => dispatch(addCustomer(name, createdBy)),
    onCustomerDeleted: (customerId) => dispatch(deleteCustomer(customerId)),
    onCustomerUpdated: (customerId, name, editedBy) => dispatch(updateCustomer(customerId, name, editedBy)),
    loadCustomers: () => dispatch(loadCustomers()),
    updateKeyboardTarget: (target, callback, value) => dispatch(changeKeyboardTarget(target, callback, value)),
});

export const CustomerScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerScreen);