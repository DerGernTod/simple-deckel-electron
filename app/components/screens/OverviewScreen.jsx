import React from 'react';
import PropTypes from 'prop-types';
import { CustomerListContainer } from '../../containers/customer-list-container';
import { CustomerItemListContainer } from '../../containers/customer-item-list-container';
import { LoginPopupContainer } from '../../containers/utils/popups/login-popup-container';
import { CartPopupContainer } from '../../containers/utils/popups/cart-popup-container';
import { PaymentPopupContainer } from '../../containers/utils/popups/payment-popup-container';
import { HistoryPopupContainer } from '../../containers/utils/popups/history-popup-container';

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
        if (itemButton === 'cart') {
            this.cartPopup.show();
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
        const hasCustomerId = !isNaN(this.props.selectedCustomerId);
        return (
            <React.Fragment>
                <LoginPopupContainer ref={elem => this.loginPopup = elem} onConfirmed={() => this.onLoginSuccessful()} title='Login erforderlich' />
                <CartPopupContainer ref={elem => this.cartPopup = elem} title='Warenkorb' width='100%' height='100%' customerId={this.props.selectedCustomerId} />
                <PaymentPopupContainer ref='paymentPopup' title='Bezahlen' customerId={this.props.selectedCustomerId} />
                <HistoryPopupContainer ref='historyPopup' title='Vergangene Rechnungen' width='100%' height='100%' customerId={this.props.selectedCustomerId} />
                <div className="column full-height">
                    <div className="panel full-height">
                        <CustomerListContainer />
                    </div>
                </div>
                <div className="column full-height">
                    <div className="panel full-height overview-mid-panel">
                        <CustomerItemListContainer selectedCustomerId={hasCustomerId ? Number(this.props.selectedCustomerId) : -1} />
                        <div className="flex item-controls">
                            <button disabled={!hasCustomerId} onClick={() => this.onItemsButtonClick('cart')}>+</button>
                            <button disabled={!hasCustomerId} onClick={() => this.onItemsButtonClick('payment')}>Bezahlen</button>
                            <button disabled={!hasCustomerId} onClick={() => this.onItemsButtonClick('history')}>Vergangene Rechnungen</button>
                        </div>
                    </div>
                </div>
                <div className="column full-height">
                    <div className="full-height overview-controls flex">
                        <div className="flex">
                            <button >Kunden verwalten</button>
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
    selectedCustomerId: PropTypes.string
};