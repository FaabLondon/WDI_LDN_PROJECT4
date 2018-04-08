  import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ShowRoute from './components/items/ShowRoute';
import IndexRoute from './components/items/IndexRoute';
import HomePage from './components/HomePage';

import Navbar from './components/common/Navbar';
import FlashMessages from './components/common/FlashMessages';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <Navbar />
          <FlashMessages />
          <section className="section">
            <Switch>
              <Route path="/cart/items/:id" />
              <Route path="/items/:id" component={ShowRoute} />
              <Route path="/items" component={IndexRoute} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/logout" />
              <Route path="/" component={HomePage} />
            </Switch>
          </section>
        </main>
      </BrowserRouter>
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
