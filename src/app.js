import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import OrderValidation from './components/orders/OrderValidation';
import CreateOrderRoute from './components/orders/CreateOrderRoute';
import ShowRoute from './components/items/ShowRoute';
import ShowCartRoute from './components/cart/ShowCartRoute';
import IndexRoute from './components/items/IndexRoute';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import HomePage from './components/HomePage';

import Navbar from './components/common/Navbar';
import FlashMessages from './components/common/FlashMessages';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <main>
          <Navbar {...this.state}/>
          <FlashMessages />
          <section className="section">
            <Switch>
              <Route path="/OrderValidation" component={OrderValidation} />
              <Route path="/checkout" component={CreateOrderRoute} />
              <Route path="/cart" component={ShowCartRoute} />
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
