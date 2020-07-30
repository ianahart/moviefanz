import React from 'react';

import fire from '../../config/Fire';

import '../../css/LoginSignup.css';
class SignUp extends React.Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
  };

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleErrors(password, confirmPassword, email) {
    if (password.length < 6) {
      this.setState({
        error: 'Password must be minimum of 6 characters',
      });
    } else if (password !== confirmPassword) {
      this.setState({
        error: 'Passwords do not match',
      });
    } else if (!email.length) {
      this.setState({
        error: 'You must provide an Email address',
      });
    } else {
      this.setState(
        {
          error: '',
        },
        () => this.props.history.push('/')
      );
    }
  }
  handleOnFormSubmit = (e) => {
    const { password, confirmPassword, email } = this.state;
    e.preventDefault();
    this.handleErrors(password, confirmPassword, email);
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => console.log(error));
  };
  render() {
    return (
      <div className="signup">
        <div className="signup-form-container">
          <form onSubmit={this.handleOnFormSubmit}>
            <h1 className="text-center">Create Account</h1>
            <p className="error">
              {this.state.error ? this.state.error : null}
            </p>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                name="email"
                onChange={this.handleOnChange}
                value={this.state.email}
                type="email"
                className="form-control"
                id="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                onChange={this.handleOnChange}
                value={this.state.password}
                type="password"
                className="form-control"
                id="password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                name="confirmPassword"
                onChange={this.handleOnChange}
                value={this.state.confirmPassword}
                type="password"
                className="form-control"
                id="confirmPassword"
              />
            </div>
            <div className="text-center">
              <button type="submit">Create</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
