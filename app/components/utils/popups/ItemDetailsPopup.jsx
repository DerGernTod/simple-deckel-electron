import React from "react";
import PropTypes from "prop-types";
import { Popup } from "./Popup";

export class ItemDetailsPopup extends Popup {
    getContent() {
        if (!this.props.item) {
            return null;
        }
        const { name, price, amount, category, timestamp } = this.props.item;
        
        const formatter = Intl.DateTimeFormat('de', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        return (
            <div className="item-details-popup">
                <div>
                    <div>Produkt</div>
                    <div>{amount} {name}</div>
                </div>
                <div>
                    <div>Gesamt</div>
                    <div>€ {price.toFixed(2)}</div>
                </div>
                <div>
                    <div>Kategorie</div>
                    <div>{category}</div>
                </div>
                <div>
                    <div>Datum</div>
                    <div>{formatter.format(timestamp)}</div>
                </div>
                <div>{/** empty on purpose */}</div>
            </div>
        );
    }
}

ItemDetailsPopup.propTypes = {
    item: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired
    })
}