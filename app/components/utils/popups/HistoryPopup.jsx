import React from 'react';
import { Popup } from "./Popup";
import PropTypes from "prop-types";
import { ConfirmPopup } from './ConfirmPopup';
import { DataBase } from '../../../state/db';
import { DB_HISTORY_LIMITS } from '../../../constants';
export class HistoryPopup extends Popup {
    constructor(props) {
        super(props);
        this.state = {
            creators: {},
            history: [],
            offset: 0,
            remainingPrev: 0,
            remainingNext: 0
        };
    }
    componentDidUpdate(oldProps, oldState) {
        if (this.state.isVisible && !oldState.isVisible) {
            this.loadItemsAndPayments(this.state.offset, DB_HISTORY_LIMITS);
        }
    }
    async loadItemsAndPayments(offset, limit) {
        this.props.onLoadStart();
        const totalItems = []
            .concat(
                await DataBase.table('items').where('customerId').equals(this.props.customerId).toArray(),
                await DataBase.table('payments').where('customerId').equals(this.props.customerId).toArray())
            .sort((a, b) => b.timestamp - a.timestamp);
        const { list, remainingNext, remainingPrev } = totalItems
            .reduce((historyStatus, curElem, index) => {
                if (index < offset) {
                    return historyStatus;
                }
                if (historyStatus.list.length >= limit) {
                    historyStatus.remainingPrev++;
                    return historyStatus;
                }
                historyStatus.list.push(curElem);
                return historyStatus;
            }, { list: [], remainingPrev: 0, remainingNext: offset });
        this.setState({
            history: list,
            remainingNext,
            remainingPrev,
            offset
        });
    }
    componentWillReceiveProps(newProps) {
        const creators = {};
        newProps.users.forEach(user => creators[user.id] = user.name);
        this.setState({
            creators
        });
    }
    delete() {
        this.props.onClear(this.props.customerId);
        this.hide();
    }
    getButtons() {
        return (
            <div>
                <button onClick={() => this.hide()}>Schließen</button>
                <button onClick={() => this.confirmPopup.show()}>Alles löschen</button>
            </div>
        );
    }
    loadMore(older) {
        this.loadItemsAndPayments(Math.max(0, this.state.offset + DB_HISTORY_LIMITS * (older ? 1 : -1)), DB_HISTORY_LIMITS);
    }
    getContent() {
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
                <ConfirmPopup title='Wirklich löschen?' ref={popup => this.confirmPopup = popup} onConfirmed={() => this.delete()} confirmText='Alles löschen'><div>Wirklich sämtliche Einträge löschen?</div></ConfirmPopup>
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
                        {this.state.remainingNext ? <tr className="controls" onClick={() => this.loadMore(false)}><td colSpan="4">{this.state.remainingNext} neuere</td></tr> : null}
                        {this.state.history.map(entry => {
                            const isPayment = !entry.category;
                            entryCounter++;
                            if (isPayment) {
                                return <tr className="cat-Payment" key={`entry-${entryCounter}`}>
                                    <td>Zahlung</td>
                                    <td>+{entry.amount} €</td>
                                    <td>{this.state.creators[entry.createdBy]}</td>
                                    <td>{dateFormat.format(entry.timestamp)}</td>
                                </tr>;
                            } else {
                                return <tr className={`cat-${entry.category}`} key={`entry-${entryCounter}`}>
                                    <td>{entry.amount} {entry.name}</td>
                                    <td>-{entry.price} €</td>
                                    <td>Unbekannt</td>
                                    <td>{dateFormat.format(entry.timestamp)}</td>
                                </tr>;
                            }
                        })}
                        {this.state.remainingPrev ? <tr className="controls" onClick={() => this.loadMore(true)}><td colSpan="4">{this.state.remainingPrev} ältere</td></tr> : null}
                    </tbody>
                </table>
            </div>
        );
    }
}

HistoryPopup.propTypes = {
    ...Popup.propTypes,
    onClear: PropTypes.func.isRequired,
    customerId: PropTypes.number.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })),
    onLoadStart: PropTypes.func.isRequired,
    onLoadComplete: PropTypes.func.isRequired
};