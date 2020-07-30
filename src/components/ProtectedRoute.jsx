import React from 'react';
import { Route, Redirect } from 'react-router-dom';

class ProtectedRoute extends React.Component {
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        render={(props) => {
          if (rest.auth) {
            return <Component {...rest} {...props} />;
          } else if (rest.auth === false) {
            return <Redirect to="/login" />;
          } else {
            return null;
          }
        }}
      />
    );
  }
}

export default ProtectedRoute;
