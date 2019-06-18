import { connect } from "react-redux";
import { ProductScreen } from "../../components/screens/ProductScreen";
import { addProduct, deleteProduct } from "../../state/actions/product-actions";
import { changeKeyboardTarget } from "../../state/actions/status-actions";

const mapStateToProps = (state) => {
    const products = state.products.list.map(({id, name, price, category, createdBy, timestamp}) => ({
            id,
            name,
            price,
            category,
            createdBy: state.users.list.find(user => user.id === createdBy).name,
            timestamp
        }));
    return {
        products,
        loggedInUser: state.status.loggedInUser
    };
};

const mapDispatchToProps = (dispatch) => ({
    onProductAdded: (name, price, category, createdBy) => dispatch(addProduct(name, price, category, createdBy)),
    onProductDeleted: (productId) => dispatch(deleteProduct(productId)),
    updateKeyboardTarget: (target, callback, value) => dispatch(changeKeyboardTarget(target, callback, value)),
});

export const ProductScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductScreen);