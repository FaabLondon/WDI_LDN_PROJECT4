import React from 'react';
import { Link, withRouter } from 'react-router-dom'; //coming from Brower Router
import Auth from '../../lib/Auth';
import User from '../../lib/User';

class Navbar extends React.Component {

  //no need for constructor etc thanks to plugin in babelrc
  state = {
    navIsOpen: false
  }

  //this is undefined in handleToggle so we made a function an arrow function as does not care about this and does not create its own this
  handleToggle = () => {
    this.setState({ navIsOpen: !this.state.navIsOpen });
  }

  //1st part is needed otherwise infinte loop, as when we run setState, it updates state so will fire componentWillUpdate which setState again
  componentWillUpdate(){
    this.state.navIsOpen && this.setState({ navIsOpen: false });
  }

  handleLogout = () => {
    Auth.logout();
    User.clearCurrentUser();
    this.props.history.push('/items');
  }

  render() {
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img src="http://blog.protur-hotels.com/wp-content/uploads/2017/04/codigo-vestimenta-protur-hotels-almeria-mallorca-1.jpg" alt="DressCode" />
              Luxury to Rent
          </Link>

          <div data-target="#mobile-menu"
            onClick={this.handleToggle}
            className={`navbar-burger ${this.state.navIsOpen ? 'is-active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="mobile-menu" className={`navbar-menu ${this.state.navIsOpen ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <div className="navbar-item has-dropdown is-hoverable">
              <Link className="navbar-link" to="/items"> Clothing</Link>
              <div className="navbar-dropdown is-boxed">
                <Link className="navbar-item" to="/items"> Bridal</Link>
                <Link className="navbar-item" to="/items"> Dresses</Link>
                <Link className="navbar-item" to="/items"> Activewear</Link>
                <Link className="navbar-item" to="/items"> Jackets & Coats</Link>
                <Link className="navbar-item" to="/items"> Trousers</Link>
                <Link className="navbar-item" to="/items"> Knits</Link>
              </div>
            </div>
            <div className="navbar-item">
              Placeholder for search field
            </div>
          </div>
          <div className="navbar-end">
            {Auth.isAuthenticated() && <a className="navbar-item favourites" href=""><span className="icon is-small"><i className="far fa-heart"></i></span></a>}
            {Auth.isAuthenticated() && <a className="navbar-item cart" href=""><span className="icon is-small"><i className="fas fa-shopping-bag"></i></span></a>}

            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-link"><span className="icon is-small"><i className="fas fa-user"></i></span>{User.getCurrentUser() && User.getCurrentUser().username}</div>
              {Auth.isAuthenticated() &&
                <div className="navbar-dropdown is-boxed is-right">
                  <Link className="navbar-item" to="">My account</Link>
                  <Link className="navbar-item" to="">Upcoming order</Link>
                  <Link className="navbar-item" to="">Order history</Link>
                  <hr className="navbar-divider" />
                  <a className="navbar-item" to="logout/" onClick={this.handleLogout}>Sign out</a>
                </div>
              }
            </div>
            {!Auth.isAuthenticated() &&
              <div>
                <a className="navbar-item" to="/login"><span className="icon is-small"><i className="far fa-user"></i></span>Login</a>
                <a className="navbar-item" to="/register">Join</a>
              </div>
            }
          </div>
        </div>
      </nav>
    );
  }
}


export default withRouter(Navbar); //wrap Navbar in withRouter to give history, match etc
