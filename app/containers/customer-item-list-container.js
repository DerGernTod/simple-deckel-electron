import { connect } from "react-redux";
import { ItemList } from "../components/lists/ItemList";

const mapStateToProps = (state, ownProps) => {
    const selectedCustomer = state.customers.list.find(customer => customer.id === ownProps.selectedCustomerId);
    return {
        items: selectedCustomer ? selectedCustomer.items : [],
        payments: selectedCustomer ? selectedCustomer.payments: []
    };
};

const mapDispatchToProps = (dispatch) => ({
    onItemClick: (id) => console.log('select item', id)
});

export const CustomerItemListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemList);
