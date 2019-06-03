import { connect } from "react-redux";
import { GermanKeyboard } from "../components/utils/GermanKeyboard";
import { changeKeyboardTarget } from "../state/actions/status-actions";

const mapStateToProps = (state) => ({
    target: state.status.vkeyboardTarget,
    onChange: state.status.vkeyboardCallback,
    inputValue: state.status.vkeyboardInitValue
});

const mapDispatchToProps = (dispatch) => ({
    hide: () => dispatch(changeKeyboardTarget('', () => void 0))
});

export const GermanKeyboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GermanKeyboard);