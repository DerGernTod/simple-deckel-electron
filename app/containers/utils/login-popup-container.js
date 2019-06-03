import { connect } from "react-redux";
import { LoginPopup } from "../../components/utils/LoginPopup";
import { changeKeyboardTarget } from "../../state/actions/status-actions";

const mapStateToProps = (state) => {
    return {
        vkeyboardTarget: state.status.vkeyboardTarget,
        users: state.users.list
    };
};

const mapDispatchToProps = (dispatch) => ({
    updateKeyboardTarget: (target, callback, value) => dispatch(changeKeyboardTarget(target, callback, value))
});

export const LoginPopupContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
)(LoginPopup);
