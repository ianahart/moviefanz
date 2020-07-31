import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../Home';
import About from '../About';
import ProtectedRoute from '../../ProtectedRoute';
import Login from '../Login';
import SignUp from '../SignUp';
import ResetPassword from '../ResetPassword';
import Favorites from '../Favorites';
import Popular from '../Popular';
import Movies from '../Movies';
import ShowMovie from '../ShowMovie';
import NotFound from '../NotFound';

class Navigation extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <ProtectedRoute
          path="/favorites"
          exact
          auth={this.props.user}
          favoriteIds={this.props.favoriteIds}
          removeMovieFromFavorites={this.props.removeMovieFromFavorites}
          removeAllMovies={this.props.removeAllMovies}
          component={Favorites}
        />

        <ProtectedRoute
          path="/popular"
          exact
          auth={this.props.user}
          component={Popular}
        />
        <ProtectedRoute
          path="/movies"
          exact
          auth={this.props.user}
          addMovieToFavorites={this.props.addMovieToFavorites}
          component={Movies}
        />
        <Route
          path="/login"
          exact
          render={(props) => {
            return <Login {...props} />;
          }}
        />
        <Route path="/signup" exact component={SignUp} />
        <ProtectedRoute
          path="/resetpassword"
          auth={this.props.user}
          component={ResetPassword}
        />
        <Route path="/movies/:id" exact component={ShowMovie} />
        <Route path="/about" exact component={About} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default Navigation;
