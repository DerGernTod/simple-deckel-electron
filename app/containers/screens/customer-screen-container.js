import { connect } from "react-redux";
import { CustomerScreen } from "../../components/screens/CustomerScreen";

/*
customers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
        lastOrder: PropTypes.number.isRequired,
        lastPayment: PropTypes.number.isRequired,
        createdBy: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired
    })).isRequired,
    loggedInUser: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.number.isRequired
    })
 */
const mapStateToProps = (state) => {
    const customers = state.customers.list.map(({id, name, total, items, payments, createdBy, timestamp}) => ({
            id,
            name,
            total,
            items,
            createdBy,
            timestamp,
            lastOrder: items.reduce((maxTimestamp, curItem) => Math.max(maxTimestamp, curItem.timestamp), 0),
            lastPayment: payments.reduce((maxTimestamp, curItem) => Math.max(maxTimestamp, curItem.timestamp), 0)
        }));
    return {
        customers,
        loggedInUser: state.status.loggedInUser
    };
};

const mapDispatchToProps = () => ({
});

export const CustomerScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerScreen);