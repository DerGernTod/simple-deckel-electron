import React from 'react';
import {ProductListContainer} from '../containers/product-list-container';
import {CustomerListContainer} from '../containers/customer-list-container';
import { CustomerItemListContainer } from '../containers/customer-item-list-container';

export default () => 
      <div id="content">
        <div>
          <h1>Products</h1>
          <ProductListContainer />
        </div>
        <div>
          <h1>Customers</h1>
          <CustomerListContainer />
        </div>
        <div>
          <h1>Items</h1>
          <CustomerItemListContainer />
        </div>
      </div>;
