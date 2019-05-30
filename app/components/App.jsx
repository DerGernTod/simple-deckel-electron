import React from 'react';
import {ProductListContainer} from '../containers/product-list-container';
import {CustomerListContainer} from '../containers/customer-list-container';
import { CustomerItemListContainer } from '../containers/customer-item-list-container';
import { UserConfigListContainer } from '../containers/user-config-list-container';
import { OverviewScreen } from './screens/OverviewScreen';
import { Popup } from './Popup';

export default ({ match: { params }}) => 
      <div id="content" className="flex">
        <OverviewScreen selectedCustomer={params.selectedCustomer} />
      </div>;
