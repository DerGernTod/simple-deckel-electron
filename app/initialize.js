import ReactDOM from 'react-dom';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from 'components/App';
import { rootReducer } from './state/reducers';
import { BrowserRouter as Router, Route } from 'react-router-dom'


const store = createStore(rootReducer);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store = {store}>
      <Router>
        <Route path="/:selectedCustomer?" component={App} />
      </Router>
    </Provider>,
    document.querySelector('#app'));
});
