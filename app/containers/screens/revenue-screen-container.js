import { connect } from "react-redux";
import { RevenueScreen } from "../../components/screens/RevenueScreen";
import { loadPaymentsInTimeframe } from "../../state/actions/payment-actions";

const mapStateToProps = (state) => {
    const paymentsByDate = state.payments.list.reduce((dateMap, payment) => {
        const tsDate = new Date(payment.timestamp);
        tsDate.setHours(0);
        tsDate.setMinutes(0)
        tsDate.setSeconds(0);
        tsDate.setMilliseconds(0);
        let entry = dateMap.get(tsDate.getTime()) || {
            date: tsDate.getTime(),
            revenue: 0
        };
        let newAmount = entry.revenue + payment.amount;
        dateMap.set(tsDate.getTime(), {
            date: tsDate.getTime(),
            revenue: newAmount
        });
        return dateMap;
    }, new Map());
    return {
        revenue: Array.from(paymentsByDate.values()),
        loggedInUser: state.status.loggedInUser
    };
};

const mapDispatchToProps = (dispatch) => ({
    loadPaymentsInTimeframe: (from, to, offset, limit) => dispatch(loadPaymentsInTimeframe(from, to, offset, limit)),
});

export const RevenueScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RevenueScreen);