import { connect } from "react-redux";
import { CustomerList } from "../components/lists/CustomerList"; 
import { loadCustomers } from "../state/actions/customer-actions";

const mapStateToProps = (state) => ({
    customers: state.customers.list
});

const mapDispatchToProps = (dispatch) => ({
    loadCustomers: () => dispatch(loadCustomers())
});

export const CustomerListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerList);
