import { connect } from "react-redux";
import { HistoryPopup } from "../../../components/utils/popups/HistoryPopup";
import { clearAllTransactions } from "../../../state/actions/customer-actions";

const mapStateToProps = state => {
    return {
        items: state.items.list,
        payments: state.payments.list,
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
