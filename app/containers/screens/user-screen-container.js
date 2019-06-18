import { connect } from "react-redux";
import { UserScreen } from "../../components/screens/UserScreen";
import { addUser, deleteUser } from "../../state/actions/user-actions";
import { changeKeyboardTarget } from "../../state/actions/status-actions";

const mapStateToProps = (state) => {
    const users = state.users.list.map(({id, name, createdBy, timestamp}) => ({
            id,
            name,
            createdBy: state.users.list.find(user => user.id === createdBy).name,
            timestamp
        }));
    return {
        users,
        loggedInUser: state.status.loggedInUser
    };
};

const mapDispatchToProps = (dispatch) => ({
    onUserAdded: (name, password, createdBy) => dispatch(addUser(name, password, createdBy)),
    onUserDeleted: (userId) => dispatch(deleteUser(userId)),
    updateKeyboardTarget: (target, callback, value) => dispatch(changeKeyboardTarget(target, callback, value)),
});

export const UserScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserScreen);