import { connect } from "react-redux";
import { OverviewScreen } from "../components/screens/OverviewScreen";

const mapStateToProps = (state) => ({
    lastSaved: state.status.lastSaved
});

const mapDispatchToProps = (dispatch) => ({
});

export const OverviewScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OverviewScreen);