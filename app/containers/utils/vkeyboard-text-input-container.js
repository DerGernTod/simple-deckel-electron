import { connect } from "react-redux";
import { VKeyboardTextInput } from "../../components/utils/VKeyboardTextInput";
import { changeKeyboardTarget } from "../../state/actions/status-actions";

const mapStateToProps = (state) => {
    return {
        vkeyboardTarget: state.status.vkeyboardTarget
    };
};

const mapDispatchToProps = (dispatch) => ({
    updateKeyboardTarget: (target, callback, value) => dispatch(changeKeyboardTarget(target, callback, value))
});

export const VKeyboardTextInputContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
)(VKeyboardTextInput);
