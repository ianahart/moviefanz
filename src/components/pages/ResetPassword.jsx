import React from 'react';
import { Link } from 'react-router-dom';
import fire from '../../config/Fire';
import '../../css/LoginSignup.css';

class ResetPassword extends React.Component {
  state = {
    error: '',
    successMsg: '',
    email: this.props.auth.email,
  };

  onResetFormSubmit = (e) => {
    e.preventDefault();
    const auth = fire.auth();

    auth
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        console.log('email sent');
        this.setState({
          error: '',
          successMsg: 'Email successfully sent to ' + this.state.email,
        });
      })
      .catch((err) =>
        this.setState({
          error: err.message,
          successMsg: '',
        })
      );
  };

  render() {
    return (
      <div className="reset-password">
        <div className="reset-password-form-container">
          <form onSubmit={this.onResetFormSubmit}>
            <h1 className="text-center">Reset Your Password</h1>
            <p className="error">
              {this.state.error ? this.state.error : null}
            </p>
            {this.state.successMsg ? null : (
              <p>
                An Email with a reset password link will be sent to{' '}
                {this.props.auth.email}
              </p>
            )}

            <div className="text-center">
              <p className="text-center success-msg">
                {' '}
                {this.state.successMsg ? this.state.successMsg : null}
              </p>

              {this.state.successMsg ? (
                <Link className="login-btn" to="/login">
                  Login
                </Link>
              ) : (
                <button className="reset-password-btn" type="submit">
                  Reset password
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
