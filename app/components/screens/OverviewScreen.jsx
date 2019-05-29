import React from 'react';
import { CustomerListContainer } from '../../containers/customer-list-container';
import { CustomerItemListContainer } from '../../containers/customer-item-list-container';

export const OverviewScreen = (props) => (
    <React.Fragment>
        <div className="column full-height">
            <div className="panel full-height">
                <CustomerListContainer />
            </div>
        </div>
        <div className="column full-height">
            <div className="panel full-height overview-mid-panel">
                <CustomerItemListContainer selectedCustomer={props.selectedCustomer} />
                <div className="flex item-controls">
                    <button>+</button>
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