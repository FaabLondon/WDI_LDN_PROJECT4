import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Register from './components/auth/Register';

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
              <Route path="/register" component={Register} />
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
