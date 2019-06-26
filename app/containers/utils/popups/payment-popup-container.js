import { connect } from "react-redux";
import { PaymentPopup } from "../../../components/utils/popups/PaymentPopup";
import { addPayment } from "../../../state/actions/payment-actions";
import { logout } from "../../../state/actions/status-actions";

const mapStateToProps = (state, ownProps) => {
    const customer = state.customers.list.find(customer => customer.id === Number(ownProps.customerId));
    return {
        total: customer ? Math.max(0, -customer.total.toFixed(2)) : 0,
        loggedInUser: state.status.loggedInUser
    };
};

const mapDispatchToProps = (dispatch) => ({
    onConfirmed: (customerId, amount, createdBy) => dispatch(addPayment(customerId, amount, createdBy)),
    onHide: () => dispatch(logout())
});

export const PaymentPopupContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
)(PaymentPopup);
