import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const electron = nodeRequire("electron").remote;
const fs = nodeRequire("fs").promises
const BASE_FROM = "2020-01-01T00:00";
const FORMATTER = Intl.DateTimeFormat('de', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
});

export class RevenueScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: BASE_FROM,
            to: this.timestampToISO(this.calcCurrentHour())
        };
    }

    componentDidMount() {
        this.loadPaymentsInSetTimeframe(this.state.from, this.state.to);
    }

    loadPaymentsInSetTimeframe(from, to) {
        const fromTs = this.ISOToTimestamp(from);
        const toTs = this.ISOToTimestamp(to);
        if (fromTs <= toTs) {
            this.props.loadPaymentsInTimeframe(fromTs, toTs);
        }
    }

    calcCurrentHour() {
        return this.roundToNextHour(Date.now() - new Date().getTimezoneOffset() * 60000);
    }

    filterLast24Hours() {
        const newFrom = this.timestampToISO(this.calcCurrentHour() - 24 * 60 * 60 * 1000);
        const newTo = this.timestampToISO(this.calcCurrentHour());
        this.setState({
            from: newFrom,
            to: newTo
        });
        this.loadPaymentsInSetTimeframe(newFrom, newTo);
    }

    filterAll() {
        const newFrom = BASE_FROM;
        const newTo = this.timestampToISO(this.calcCurrentHour());
        this.setState({
            from: newFrom,
            to: newTo
        });
        this.loadPaymentsInSetTimeframe(newFrom, newTo);
    }

    async showExportDialog() {
        const resultPath = await electron.dialog.showSaveDialog({
            filters: [
                { 
                    name: "Comma-separated values",
                    extensions: ["csv"]
                }
            ],
            title: `Umsaetze_${new Date().toISOString()}`
        });
        if (!resultPath) {
            return;
        }
        const SEPARATOR = ";";
        const res = this.props.revenue.map(({date, revenue}) => [
        FORMATTER.format(date),
        `${revenue.toFixed(2)} €`].join(SEPARATOR));
        res.unshift(["Datum", "Umsatz"].join(SEPARATOR))
        const csv = res.join("\n");
        try {
            await fs.writeFile(resultPath, csv, "UTF-8");
            alert(`Datei ${resultPath} gespeichert!`);
        } catch (e) {
            alert(`Fehler beim Schreiben der Datei: ${e.message}`);
        }
    }

    roundToNextHour(timestamp) {
        if (timestamp % 3600000 === 0) {
            return timestamp;
        }
        if (timestamp % 3600000 < 1800000) {
            return timestamp - (timestamp % 3600000);
        }
        return timestamp - (timestamp % 3600000) + 3600000;
    }

    timestampToISO(timestamp) {
        const date = new Date(timestamp).toISOString();
        return date.substring(0, date.length - 8);
    }

    ISOToTimestamp(iso) {
        return new Date(iso).getTime();
    }

    updateFrom(iso) {
        const newFrom = iso.substring(0, iso.length)
        this.setState({
            from: newFrom
        });
        this.loadPaymentsInSetTimeframe(newFrom, this.state.to);
    }

    updateTo(iso) {
        const newTo = iso.substring(0, iso.length);
        this.setState({
            to: newTo
        });
        this.loadPaymentsInSetTimeframe(this.state.from, newTo);
    }

    render() {
        if (this.props.loggedInUser.id < 0) {
            setTimeout(() => this.props.history.push('/overview'), 3000);
            return (<div>Access denied, redirecting...</div>);
        }

        return (
            <React.Fragment>
                <div className='column full-height broad'>
                    <div className='full-height'>
                        <div className='panel'>
                            <table className='customer-details-list'>
                                <thead>
                                    <tr>
                                        <th>Datum</th>
                                        <th>Umsatz</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {this.props.revenue.map(({date, revenue}) => <tr key={date}>
                                        <td>{FORMATTER.format(date)}</td>
                                        <td>{revenue.toFixed(2)} €</td>
                                    </tr>)}
                                </tbody>
                                
                            </table>
                        </div>
                    </div>
                </div>
                <div className='column full-height slim'>
                    <div className="full-height overview-controls flex">
                        <div className="flex">
                            <button className='full-height' onClick={() => this.filterLast24Hours()}>Letzte 24 Stunden</button>
                            <button className='full-height' onClick={() => this.filterAll()}>Alles</button>
                            <div className="column j-center">
                                <input id="filter-from" min="2020-01-01T00:00" max={this.state.to} type="datetime-local" value={this.state.from} onChange={(e) => this.updateFrom(e.target.value)}></input>
                                <div className='text-center'>bis</div>
                                <input id="filter-to" min={this.state.from} max={this.timestampToISO(Date.now())} type="datetime-local" value={this.state.to} onChange={(e) => this.updateTo(e.target.value)}></input>
                            </div>
                            <button className='full-height' onClick={() => this.showExportDialog()}>Exportieren</button>
                            <NavLink to='/overview' >
                                <button className='full-height full-width'>Zurück</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </React.Fragment>);
    }
}

RevenueScreen.propTypes = {
    revenue: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.number.isRequired,
        revenue: PropTypes.number.isRequired,
    })).isRequired,
    loggedInUser: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }),
    loadPaymentsInTimeframe: PropTypes.func.isRequired,
}