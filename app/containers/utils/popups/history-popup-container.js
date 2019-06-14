import { connect } from "react-redux";
import { HistoryPopup } from "../../../components/utils/popups/HistoryPopup";
import { clearAllTransactions } from "../../../state/actions/customer-actions";

const mapStateToProps = (state, ownProps) => {
    const foundCustomer = state.customers.list.find(customer => customer.id === Number(ownProps.customerId));
    let items = [];
    let payments = [];
    if (foundCustomer) {
        items = foundCustomer.items;
        payments = foundCustomer.payments;
    }
    return {
        items,
        payments,
        users: state.users.list
    };
};

const mapDispatchToProps = (dispatch) => ({
    onClear: (customerId) => dispatch(clearAllTransactions(customerId))
});

export const HistoryPopupContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
)(HistoryPopup);
