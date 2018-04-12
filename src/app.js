import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';

import './scss/components/appStyle.scss';

import OrderShowRoute from './components/orders/OrderShowRoute';
import OrdersIndexRoute from './components/orders/OrdersIndexRoute';
import OrderValidation from './components/orders/OrderValidation';
import CreateOrderRoute from './components/orders/CreateOrderRoute';
import ShowRoute from './components/items/ShowRoute';
import ShowCartRoute from './components/cart/ShowCartRoute';
import IndexRoute from './components/items/IndexRoute';
import UpdateUserRoute from './components/auth/UpdateUserRoute';
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
              <ProtectedRoute path="/OrderValidation" component={OrderValidation} />
              <ProtectedRoute path="/checkout" component={CreateOrderRoute} />
              <ProtectedRoute path="/cart" component={ShowCartRoute} />
              <Route path="/orders/:id" component={OrderShowRoute} />
              <Route path="/orders" component={OrdersIndexRoute} />
              <Route path="/items/:id" component={ShowRoute} />
              <Route path="/items" component={IndexRoute} />
              <Route path="/editProfile" component={UpdateUserRoute} />
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
