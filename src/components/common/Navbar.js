import React from 'react';
import { Link, withRouter } from 'react-router-dom'; //coming from Brower Router
import Auth from '../../lib/Auth';

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
              <a className="navbar-link" href="/items"> Clothing</a>
              <div className="navbar-dropdown is-boxed">
                <a className="navbar-item" href="/items"> Bridal</a>
                <a className="navbar-item" href="/items"> Dresses</a>
                <a className="navbar-item" href="/items"> Activewear</a>
                <a className="navbar-item" href="/items"> Jackets & Coats</a>
                <a className="navbar-item" href="/items"> Trousers</a>
                <a className="navbar-item" href="/items"> Knits</a>
              </div>
            </div>
            <div className="navbar-item">
              Placeholder for search field
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              {Auth.isAuthenticated()?
                <div>
                  <Link className="navbar-item" to=""><span className="icon is-small"><i className="fas fa-user"></i></span>Current user</Link>
                  <div className="navbar-dropdown is-boxed is-right">
                    <Link className="navbar-item" to="">My account</Link>
                    <Link className="navbar-item" to="">Upcoming order</Link>
                    <Link className="navbar-item" to="">Order history</Link>
                    <a className="navbar-item" to="">Sign out</a>
                  </div>
                </div>
                :
                <div>
                  <Link className="navbar-item" to=""><span className="icon is-small"><i className="far fa-user"></i></span>Login</Link>
                  <Link className="navbar-item" to="/register">Join</Link>
                </div>
              }
            </div>
          </div>
        </div>
      </nav>
    );
  }
}


export default withRouter(Navbar); //wrap Navbar in withRouter to give history, match etc
