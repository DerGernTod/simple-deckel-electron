import ReactDOM from 'react-dom';
import React from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './state/reducers';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { GermanKeyboardContainer } from './containers/keyboard-container';
import { OverviewScreenContainer } from './containers/screens/overview-screen-container';
import { CustomerScreenContainer } from './containers/screens/customer-screen-container';
import { ProductScreenContainer } from './containers/screens/product-screen-container';
import { UserScreenContainer } from './containers/screens/user-screen-container';
import { initialStatusState } from './state/reducers/status';
import { loadUsers } from './state/actions/user-actions';

const store = createStore(rootReducer, {
  users: {list: []},
  products: {list: []},
  customers: {list: []},
  items: {
    list: [],
    remainingNext: 0,
    remainingPrev: 0
  },
  payments: {
    list: [],
    remainingNext: 0,
    remainingPrev: 0
  },
  status: initialStatusState
}, compose(applyMiddleware(thunk)));

store.dispatch(loadUsers());

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store = {store}>
      <Router>
        <div id="content" className="flex">
          <Switch>
            <Route path="/overview/:selectedCustomerId?" component={OverviewScreenContainer} />
            <Route path="/customers" component={CustomerScreenContainer} />
            <Route path="/products" component={ProductScreenContainer} />
            <Route path="/users" component={UserScreenContainer} />
            <Route component={OverviewScreenContainer} />
          </Switch>
          <GermanKeyboardContainer />
        </div>
      </Router>
    </Provider>,
    document.querySelector('#app'));
});