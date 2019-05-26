import { connect } from "react-redux";
import { ItemList } from "../components/lists/ItemList";

const mapStateToProps = (state) => {
    
    const selectedCustomer = state.customers.list.find(customer => customer.id === state.customers.selectedId);
    return {
        items: selectedCustomer ? selectedCustomer.items : []
    };
};

const mapDispatchToProps = (dispatch) => ({
    onItemClick: (id) => console.log('select item', id)
});

export const CustomerItemListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemList);
