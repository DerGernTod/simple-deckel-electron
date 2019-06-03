import React from 'react';
import PropTypes from 'prop-types';
import { CustomerListContainer } from '../../containers/customer-list-container';
import { CustomerItemListContainer } from '../../containers/customer-item-list-container';
import { Popup } from "../utils/Popup";
import { LoginPopupContainer } from '../../containers/utils/login-popup-container';

export class OverviewScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLoginAction: () => void 0
        };
    }
    onLoginSuccessful() {
        this.state.currentLoginAction();
    }
    onItemsButtonClick(itemButton) {
        if (itemButton === 'basket') {
            this.refs.basketPopup.show();
        } else {
            this.setState({
                currentLoginAction: () => this.refs[`${itemButton}Popup`].show()
            });
            this.loginPopup.show();
        }
    }
    resetLoginAction() {
        this.setState({
            currentLoginAction: () => void 0
        });
    }
    render() {
        const props = this.props;
        return (
            <React.Fragment>
                <LoginPopupContainer ref={elem => this.loginPopup = elem} onConfirmed={() => this.onLoginSuccessful()} title='Login erforderlich' />
                <Popup title='Warenkorb' width='100%' height='100%' ref='basketPopup' onHide={() => this.resetLoginAction()} />
                <Popup ref='paymentPopup' onHide={() => this.resetLoginAction()} />
                <Popup ref='historyPopup' width='100%' height='100%' onHide={() => this.resetLoginAction()} />
                <div className="column full-height">
                    <div className="panel full-height">
                        <CustomerListContainer />
                    </div>
                </div>
                <div className="column full-height">
                    <div className="panel full-height overview-mid-panel">
                        <CustomerItemListContainer selectedCustomer={props.selectedCustomer} />
                        <div className="flex item-controls">
                            <button onClick={() => this.onItemsButtonClick('basket')}>+</button>
                            <button onClick={() => this.onItemsButtonClick('payment')}>Zahlung hinzufügen</button>
                            <button onClick={() => this.onItemsButtonClick('history')}>Vergangene Zahlungen</button>
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
                            <div>Zuletzt gespeichert: {this.props.lastSaved}</div>
                            <button onClick={() => window.close()}>Beenden</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

OverviewScreen.propTypes = {
    lastSaved: PropTypes.string.isRequired,
    selectedCustomer: PropTypes.string
};