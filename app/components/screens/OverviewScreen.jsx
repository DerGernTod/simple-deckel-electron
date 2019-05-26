import React from 'react';
import { CustomerListContainer } from '../../containers/customer-list-container';
import { CustomerItemListContainer } from '../../containers/customer-item-list-container';

export const OverviewScreen = () => (
    <React.Fragment>
        <div className="column full-height">
            <div className="panel full-height">
                <CustomerListContainer />
            </div>
        </div>
        <div className="column full-height">
            <div className="panel full-height overview-mid-panel">
                <CustomerItemListContainer />
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
                    <button>Beenden</button>
                    <div>Zuletzt gespeichert: Nie</div>
                </div>
            </div>
        </div>
    </React.Fragment>
);