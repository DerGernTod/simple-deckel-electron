import { connect } from "react-redux";
import { PaymentPopup } from "../../../components/utils/popups/PaymentPopup";
import { addPayment } from "../../../state/actions/customer-actions";

const mapStateToProps = (state, ownProps) => {
    const customer = state.customers.list.find(customer => customer.id === Number(ownProps.customerId));
    return {
        total: customer ? Math.max(0, -customer.total.toFixed(2)) : 0
    };
};

const mapDispatchToProps = (dispatch) => ({
    onConfirmed: (customerId, amount) => dispatch(addPayment(customerId, amount))
});

export const PaymentPopupContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
)(PaymentPopup);
