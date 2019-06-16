import ReactDOM from 'react-dom';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './state/reducers';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { GermanKeyboardContainer } from './containers/keyboard-container';
import { OverviewScreenContainer } from './containers/screens/overview-screen-container';
import { CustomerScreen } from './components/screens/CustomerScreen';

const store = createStore(rootReducer);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store = {store}>
      <Router>
        <div id="content" className="flex">
          <Switch>
            <Route path="/overview/:selectedCustomerId?" component={OverviewScreenContainer} />
            <Route path="/customers" component={CustomerScreen} />
            <Route component={OverviewScreenContainer} />
          </Switch>
          <GermanKeyboardContainer />
        </div>
      </Router>
    </Provider>,
    document.querySelector('#app'));
});