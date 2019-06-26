import { connect } from "react-redux";
import { LoginPopup } from "../../../components/utils/popups/LoginPopup";
import { changeKeyboardTarget, login } from "../../../state/actions/status-actions";

const mapStateToProps = (state) => {
    return {
        vkeyboardTarget: state.status.vkeyboardTarget,
        users: state.users.list
    };
};

const mapDispatchToProps = (dispatch) => ({
    updateKeyboardTarget: (target, callback, value) => dispatch(changeKeyboardTarget(target, callback, value)),
    onLogin: (id, name) => dispatch(login(id, name))
});

export const LoginPopupContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
)(LoginPopup);
