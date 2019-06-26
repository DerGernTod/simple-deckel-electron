import { connect } from "react-redux";
import { UserScreen } from "../../components/screens/UserScreen";
import { addUser, deleteUser, updateUser } from "../../state/actions/user-actions";
import { changeKeyboardTarget } from "../../state/actions/status-actions";

const mapStateToProps = (state) => {
    const users = state.users.list.map(({id, name, createdBy, timestamp}) => {
        const foundUser = state.users.list.find(user => user.id === createdBy);
        return {
            id,
            name,
            createdBy: foundUser ? foundUser.name : 'Niemand',
            timestamp
        };
    });
    return {
        users,
        loggedInUser: state.status.loggedInUser
    };
};

const mapDispatchToProps = (dispatch) => ({
    onUserAdded: (name, password, createdBy) => dispatch(addUser(name, password, createdBy)),
    onUserDeleted: (userId) => dispatch(deleteUser(userId)),
    onUserUpdated: (id, name, password, editedBy) => dispatch(updateUser(id, name, password, editedBy)),
    updateKeyboardTarget: (target, callback, value) => dispatch(changeKeyboardTarget(target, callback, value)),
});

export const UserScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserScreen);