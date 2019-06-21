import { connect } from "react-redux";
import { OverviewScreen } from "../../components/screens/OverviewScreen";

const mapStateToProps = (state, ownProps) => {
    const selectedCustomerId = Number(ownProps.match.params.selectedCustomerId);
    const customer = state.customers.list.find(customer => customer.id === selectedCustomerId);

    return {
        loading: !!state.status.loading,
        total: customer ? customer.total : 0,
        selectedCustomerId
    };
};

const mapDispatchToProps = () => ({
});

export const OverviewScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OverviewScreen);