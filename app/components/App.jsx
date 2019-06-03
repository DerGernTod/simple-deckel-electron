import React from 'react';
import { OverviewScreenContainer } from '../containers/overview-screen-container';
import { GermanKeyboardContainer } from '../containers/keyboard-container';

export default ({ match: { params }}) => 
      <div id="content" className="flex">
        <OverviewScreenContainer selectedCustomer={params.selectedCustomer} />
        <GermanKeyboardContainer />
      </div>;
