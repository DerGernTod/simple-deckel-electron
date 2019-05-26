import { connect } from "react-redux";
import { ProductList } from "../components/lists/ProductList";

const mapStateToProps = (state) => ({
    products: state.products
});

const mapDispatchToProps = (dispatch) => ({
    onAdd: () => console.log('add')
});

export const ProductListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);