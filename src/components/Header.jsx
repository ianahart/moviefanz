import React from 'react';
import { Link } from 'react-router-dom';

import AccountDetails from './pages/subcomponents/AccountDetails';
import '../css/Header.css';
class Header extends React.Component {
  state = {
    isModalOpen: null,
  };

  openModal = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  showModal = () => {
    return (
      <AccountDetails
        email={this.props.user.email}
        closeModal={this.closeModal}
      />
    );
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  loggedInLinks = () => {
    if (this.props.user) {
      return (
        <React.Fragment>
          <li className="nav-item">
            <button onClick={this.openModal} className="nav-link">
              Account
            </button>
            {this.state.isModalOpen ? this.showModal() : null}
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/favorites">
              Favorites
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/popular">
              Popular
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/movies">
              Movies
            </Link>
          </li>
        </React.Fragment>
      );
    }
  };

  render() {
    const loggedInLinks = this.loggedInLinks();
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark">
          <Link className="navbar-brand" to="/">
            MovieFanz <i className="fas fa-film"></i>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                {this.props.user === null || this.props.user === false ? (
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                ) : null}
              </li>
              {loggedInLinks}
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
