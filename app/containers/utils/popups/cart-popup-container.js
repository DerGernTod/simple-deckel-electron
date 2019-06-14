import { connect } from "react-redux";
import { CartPopup } from "../../../components/utils/popups/CartPopup";
import { addItems } from "../../../state/actions/customer-actions";

const mapStateToProps = (state) => {
    return {
        products: state.products.list
    };
};

const mapDispatchToProps = (dispatch) => ({
    onConfirmed: (customerId, cartContent) => dispatch(addItems(customerId, cartContent))
});

export const CartPopupContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
)(CartPopup);
