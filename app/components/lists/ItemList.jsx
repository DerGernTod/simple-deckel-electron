import React from "react";
import PropTypes from "prop-types";
import { Item } from "../utils/Item"; 
import { DB_LIMITS } from "../../constants";

export class ItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemOffset: 0
        };
    }
    componentDidMount() {
        this.props.loadItems(this.props.customerId);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.customerId !== this.props.customerId) {
            this.props.loadItems(this.props.customerId, 0, DB_LIMITS);
        }
    }
    load(older) {
        const newOffset = Math.max(0, this.state.itemOffset + DB_LIMITS * (older ? 1 : -1))
        this.setState({
            itemOffset: newOffset
        });
        this.props.loadItems(this.props.customerId, newOffset, DB_LIMITS);
    }
    render() {
        const items = this.props.items;
        const entries = [];
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (!item.isPaid) {
                entries.push(<Item
                    key = {item.id}
                    name = {item.name}
                    price = {-item.price}
                    category = {item.category}
                    amount = {item.amount}
                    onClick = {() => this.props.onItemClick(item.id)}
                />);
            }
        }
    
        return (
            <ul className="item-list flex-list">
                {this.props.numNextItems ? <li key='next-li' onClick={() => this.load(false)}>{this.props.numNextItems} neuere</li> : null}
                {entries}
                {this.props.numPrevItems ? <li key='prev-li' onClick={() => this.load(true)}>{this.props.numPrevItems} ältere</li> : null}
            </ul>
        );
    }
}

ItemList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
    })),
    numNextItems: PropTypes.number.isRequired,
    numPrevItems: PropTypes.number.isRequired,
    onItemClick: PropTypes.func.isRequired,
    customerId: PropTypes.number.isRequired
};