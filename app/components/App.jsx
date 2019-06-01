import React from 'react';
import { OverviewScreen } from './screens/OverviewScreen';

export default ({ match: { params }}) => 
      <div id="content" className="flex">
        <OverviewScreen selectedCustomer={params.selectedCustomer} />
      </div>;
