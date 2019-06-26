import { connect } from "react-redux";
import { LoadingPopup } from "../../../components/utils/popups/LoadingPopup";

const mapStateToProps = (state) => {
    return {
        isLoading: !!state.status.loading,
    };
};

const mapDispatchToProps = (dispatch) => ({
});

export const LoadingPopupContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    null
)(LoadingPopup);
