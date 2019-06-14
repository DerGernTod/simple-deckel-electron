import React from 'react';
import { Popup } from "./Popup";
import PropTypes from "prop-types";
export class HistoryPopup extends Popup {
    constructor(props) {
        super(props);
        this.state = {
            creators: {}
        };
    }
    componentWillReceiveProps(newProps) {
        const creators = {};
        newProps.users.forEach(user => creators[user.id] = user.name);
        this.setState({
            creators
        });
    }
    delete() {
        this.props.onClear(Number(this.props.customerId));
        this.hide();
    }
    getButtons() {
        return (
            <div>
                <button onClick={() => this.hide()}>Schließen</button>
                <button onClick={() => this.delete()}>Alles löschen</button>
            </div>
        );
    }
    getContent() {
        const collectedList = this.props.items.concat(this.props.payments);
        collectedList.sort((a, b) => a.timestamp - b.timestamp);
        let entryCounter = 0;
        let dateFormat = new Intl.DateTimeFormat('de', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
        return (
            <div className='history-popup'>
                <table className='history'>
                    <thead>
                        <tr>
                            <th>Produkt</th>
                            <th>Betrag</th>
                            <th>Eingetragen von</th>
                            <th>Datum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {collectedList.map(entry => {
                            const isPayment = !entry.category;
                            entryCounter++;
                            if (isPayment) {
                                return <tr key={`entry-${entryCounter}`}>
                                    <td>Zahlung</td>
                                    <td>+{entry.amount} €</td>
                                    <td>{this.state.creators[entry.createdBy]}</td>
                                    <td>{dateFormat.format(Date.now())}</td>
                                </tr>;
                            } else {
                                return <tr key={`entry-${entryCounter}`}>
                                    <td>{entry.amount} {entry.name}</td>
                                    <td>-{entry.price} €</td>
                                    <td>Unbekannt</td>
                                    <td>{dateFormat.format(Date.now())}</td>
                                </tr>;
                            }
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

HistoryPopup.propTypes = {
    ...Popup.propTypes,
    onClear: PropTypes.func.isRequired,
    customerId: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
    })),
    payments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
        createdBy: PropTypes.number.isRequired,
        timestamp: PropTypes.number.isRequired
    })),
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }))
};