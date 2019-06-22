import { connect } from "react-redux";
import { HistoryPopup } from "../../../components/utils/popups/HistoryPopup";
import { clearAllTransactions } from "../../../state/actions/customer-actions";
import { STATUS_LOADING, STATUS_SAVE_COMPLETE } from "../../../state/actions";

const mapStateToProps = state => {
    return {
        users: state.users.list
    };
};

const mapDispatchToProps = (dispatch) => ({
    onClear: (customerId) => dispatch(clearAllTransactions(customerId)),
    onLoadStart: () => dispatch({
        type: STATUS_LOADING
    }),
    onLoadComplete: () => dispatch({
        type: STATUS_SAVE_COMPLETE
    })
});

export const HistoryPopupContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
)(HistoryPopup);
