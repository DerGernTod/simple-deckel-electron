import React from 'react';
import { CustomerListContainer } from '../../containers/customer-list-container';
import { CustomerItemListContainer } from '../../containers/customer-item-list-container';
import { Popup } from '../Popup';

export class OverviewScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popupVisible: false,
            popupTitle: '',
            onPopupAccepted: () => void 0
        };
    }
    onPopupHide() {
        this.setState({
            popupVisible: false
        });
    }
    showPopup(title, callback) {
        this.setState({
            popupVisible: true,
            popupTitle: title,
            onPopupAccepted: callback
        });
    }
    render() {
        const props = this.props;
        return (
            <React.Fragment>
                <Popup onHide={() => this.onPopupHide()} isVisible={this.state.popupVisible} title={this.state.popupTitle}>
                    <div>some popup text</div>
                </Popup>
                <div className="column full-height">
                    <div className="panel full-height">
                        <CustomerListContainer />
                    </div>
                </div>
                <div className="column full-height">
                    <div className="panel full-height overview-mid-panel">
                        <CustomerItemListContainer selectedCustomer={props.selectedCustomer} />
                        <div className="flex item-controls">
                            <button onClick={() => this.showPopup('Eintrag hinzufügen', () => console.log('added!'))}>+</button>
                            <button>Zahlung hinzufügen</button>
                            <button>Vergangene Zahlungen</button>
                        </div>
                    </div>
                </div>
                <div className="column full-height">
                    <div className="full-height overview-controls flex">
                        <div className="flex">
                            <button>Kunden verwalten</button>
                            <button>Produkte verwalten</button>
                            <button>Benutzer verwalten</button>
                        </div>
                        <div className="flex">
                            <div>Zuletzt gespeichert: Nie</div>
                            <button>Beenden</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}