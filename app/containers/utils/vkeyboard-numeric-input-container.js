import { connect } from "react-redux";
import { VKeyboardNumericInput } from "../../components/utils/VKeyboardNumericInput";
import { changeKeyboardTarget } from "../../state/actions/status-actions";

const mapStateToProps = (state) => {
    return {
        vkeyboardTarget: state.status.vkeyboardTarget
    };
};

const mapDispatchToProps = (dispatch) => ({
    updateKeyboardTarget: (target, callback, value) => dispatch(changeKeyboardTarget(target, callback, value))
});

export const VKeyboardNumericInputContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
)(VKeyboardNumericInput);
