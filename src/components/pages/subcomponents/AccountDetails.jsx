import React from 'react';
import { Link } from 'react-router-dom';
import fire from '../../../config/Fire';
import '../../../css/AccountDetails.css';

class AccountDetails extends React.Component {
  handleLogout = () => {
    fire.auth().signOut();
    this.props.closeModal();
  };
  render() {
    return (
      <div id="myModal" className="myModal">
        <div className="modal-info">
          <div className="heading">
            <i
              onClick={this.props.closeModal}
              className="far fa-times-circle"
            ></i>
          </div>
          <div className="content">
            <p className="text-center">
              You are logged in as:{' '}
              <span className="user-email">{this.props.email}</span>
            </p>
            <div className="line-border"></div>
          </div>
          <div className="links">
            <Link to="/resetpassword" onClick={() => this.props.closeModal()}>
              Change Password
            </Link>
            <Link to="/" onClick={this.handleLogout}>
              Logout
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default AccountDetails;
