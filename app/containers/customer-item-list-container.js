import { connect } from "react-redux";
import { ItemList } from "../components/lists/ItemList";
import { loadItems } from "../state/actions/item-actions";

const mapStateToProps = (state) => {
    return {
        items: state.items.list,
        payments: state.payments.list,
        numNextItems: state.items.remainingNext,
        numPrevItems: state.items.remainingPrev
    };
};

const mapDispatchToProps = (dispatch) => ({
    onItemClick: (id) => console.log('select item', id),
    loadItems: (customerId, offset, limit) => dispatch(loadItems(customerId, offset, limit))
});

export const CustomerItemListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemList);
