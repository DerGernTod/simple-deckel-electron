import { connect } from "react-redux";
import { CustomerList } from "../components/lists/CustomerList"; 
import { selectCustomer } from "../state/actions/customer-actions";

const mapStateToProps = (state) => ({
    customers: state.customers.list
});

const mapDispatchToProps = (dispatch) => ({
    onCustomerSelect: (id) => dispatch(selectCustomer(id))
});

export const CustomerListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerList);
