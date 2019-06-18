import ReactDOM from 'react-dom';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './state/reducers';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { GermanKeyboardContainer } from './containers/keyboard-container';
import { OverviewScreenContainer } from './containers/screens/overview-screen-container';
import { CustomerScreenContainer } from './containers/screens/customer-screen-container';
import { ProductScreenContainer } from './containers/screens/product-screen-container';

const store = createStore(rootReducer);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store = {store}>
      <Router>
        <div id="content" className="flex">
          <Switch>
            <Route path="/overview/:selectedCustomerId?" component={OverviewScreenContainer} />
            <Route path="/customers" component={CustomerScreenContainer} />
            <Route path="/products" component={ProductScreenContainer} />
            <Route component={OverviewScreenContainer} />
          </Switch>
          <GermanKeyboardContainer />
        </div>
      </Router>
    </Provider>,
    document.querySelector('#app'));
});