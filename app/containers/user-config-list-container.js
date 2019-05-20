import { connect } from "react-redux";
import { UserConfigList } from "../components/UserConfigList";

const mapStateToProps = (state) => ({
    users: state.users.list
});

const mapDispatchToProps = (dispatch) => ({
    onAdd: () => console.log('add user')
});

export const UserConfigListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserConfigList);