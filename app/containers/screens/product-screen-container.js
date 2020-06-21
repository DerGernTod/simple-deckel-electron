import { connect } from "react-redux";
import { ProductScreen } from "../../components/screens/ProductScreen";
import { addProduct, deleteProduct, loadProducts, updateProduct } from "../../state/actions/product-actions";
import { changeKeyboardTarget } from "../../state/actions/status-actions";

const mapStateToProps = (state) => {
    const products = state.products.list.map(({id, name, price, category, createdBy, timestamp}) => {
        const creator = state.users.list.find(user => user.id === createdBy);

        return {id,
            name,
            price,
            category,
            createdBy: creator ? creator.name : "Unbekannt",
            timestamp
        };
    });
    return {
        products,
        loggedInUser: state.status.loggedInUser
    };
};

const mapDispatchToProps = (dispatch) => ({
    onProductAdded: (name, price, category, createdBy) => dispatch(addProduct(name, price, category, createdBy)),
    onProductDeleted: (productId) => dispatch(deleteProduct(productId)),
    onProductUpdated: (id, name, price, category, editedBy) => dispatch(updateProduct(id, name, price, category, editedBy)),
    loadProducts: () => dispatch(loadProducts()),
    updateKeyboardTarget: (target, callback, value) => dispatch(changeKeyboardTarget(target, callback, value)),
});

export const ProductScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductScreen);