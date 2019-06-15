import { connect } from "react-redux";
import { OverviewScreen } from "../components/screens/OverviewScreen";

const mapStateToProps = (state, ownProps) => {
    const customer = state.customers.list.find(customer => customer.id === Number(ownProps.selectedCustomerId));

    return {
        lastSaved: state.status.lastSaved,
        total: customer ? customer.total : 0
    };
};

const mapDispatchToProps = () => ({
});

export const OverviewScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OverviewScreen);