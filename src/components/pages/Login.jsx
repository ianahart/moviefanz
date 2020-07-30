import React from 'react';
import { Link } from 'react-router-dom';

import fire from '../../config/Fire';
import '../../css/LoginSignup.css';
class Login extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
  };

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleOnFormSubmit = (e) => {
    const { email, password } = this.state;
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(
          {
            error: '',
          },
          () => this.props.history.push('/')
        );
      })
      .catch((err) => this.setState({ error: err.message }));
  };
  render() {
    return (
      <div className="login">
        <div className="login-form-container">
          <form onSubmit={this.handleOnFormSubmit}>
            <h1 className="text-center">Login</h1>
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
            <div className="text-center">
              <p className="text-center">
                Not registered? <Link to="/signup">Create an Account</Link>
              </p>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
