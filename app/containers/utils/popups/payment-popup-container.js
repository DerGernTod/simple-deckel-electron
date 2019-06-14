import { connect } from "react-redux";
import { PaymentPopup } from "../../../components/utils/popups/PaymentPopup";
import { addPayment } from "../../../state/actions/customer-actions";

const mapStateToProps = (state) => {
    return {
        products: state.products.list
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
