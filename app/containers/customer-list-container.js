import { connect } from "react-redux";
import { CustomerList } from "../components/lists/CustomerList"; 

const mapStateToProps = (state) => ({
    customers: state.customers.list
});

const mapDispatchToProps = () => ({
});

export const CustomerListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerList);
