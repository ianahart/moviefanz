import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import fire from '../config/Fire';
import Header from './Header';

import Footer from './Footer';

import '../css/App.css';
import Navigation from './pages/subcomponents/Navigation';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteIds: [],
      user: null,
    };
    this.db = fire.firestore();
  }

  componentDidMount() {
    this.listener = fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState(
          {
            user,
          },
          () => {
            this.getFavoriteIdsFomDB();
          }
        );
      } else {
        this.setState({
          user: false,
        });
      }
    });
  }

  getFavoriteIdsFomDB = () => {
    let items = [];
    this.db
      .collection('favoriteIds')
      .where('userId', '==', this.state.user.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        this.setState({
          favoriteIds: items,
        });
      });
  };

  componentWillUnmount() {
    this.listener();
  }

  addFavoriteIdToDB = (movieId) => {
    const movieRef = this.db.collection('favoriteIds');
    const query = movieRef.where('userId', '==', this.state.user.uid);

    query.get().then((querySnapshot) => {
      const doc = {
        movieId,
        userId: this.state.user.uid,
      };
      this.db.collection('favoriteIds').add(doc);
      this.setState((prevState) => {
        return {
          favoriteIds: prevState.favoriteIds.concat(doc),
        };
      });
    });
  };

  addMovieToFavorites = (movieId) => {
    const checkForExistingIds = () => {
      return this.state.favoriteIds.find((favoriteId) => {
        return (
          favoriteId.movieId === movieId &&
          favoriteId.userId === this.state.user.uid
        );
      });
    };
    const doesExist = checkForExistingIds();

    if (doesExist) {
      return;
    } else {
      this.addFavoriteIdToDB(movieId);
    }
  };
  removeFavoriteIdFromDB = (movieId) => {
    const favoriteIdsRef = this.db.collection('favoriteIds');
    favoriteIdsRef
      .where('movieId', '==', movieId)
      .where('userId', '==', this.state.user.uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          favoriteIdsRef.doc(doc.id).delete();
        });
      });
  };
  removeMovieFromFavorites = (movieId) => {
    this.removeFavoriteIdFromDB(movieId);
    const filteredFavorites = [...this.state.favoriteIds].filter((movie) => {
      return movie.movieId !== movieId;
    });
    this.setState({
      favoriteIds: filteredFavorites,
    });
  };

  removeAllMovies = () => {
    const ref = this.db.collection('favoriteIds');
    ref
      .where('userId', '==', this.state.user.uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          ref.doc(doc.id).delete();
        });
      });
    this.setState({
      favoriteIds: [],
    });
  };

  render() {
    return (
      <div>
        <div className="main-content">
          <Router>
            <Header user={this.state.user} />
            <div>
              <Navigation
                user={this.state.user}
                favoriteIds={this.state.favoriteIds}
                removeMovieFromFavorites={this.removeMovieFromFavorites}
                removeAllMovies={this.removeAllMovies}
                addMovieToFavorites={this.addMovieToFavorites}
              />
            </div>
          </Router>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
