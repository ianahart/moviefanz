import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import tmdb from '../../apis/tmdb';
import fire from '../../config/Fire';
import '../../css/Favorites.css';
import RemoveFavoriteButton from './subcomponents/removeFavoriteButton';
import RemoveAllButton from './subcomponents/RemoveAllButton';

class Favorites extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      favoriteMovies: [],
    };
    this.baseMoviePosterURL = 'https://image.tmdb.org/t/p/w500';
    this.unavailablePoster =
      'https://via.placeholder.com/150?text=photo+unavailable';
    this.db = fire.firestore();
    this.auth = fire.auth();
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchFavoriteMovies();
    this.getMoviesFromDB();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getMoviesFromDB = () => {
    let items = [];
    this.db
      .collection('favoriteMovies')
      .where('userId', '==', this.props.auth.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        this.setState({
          favoriteMovies: items,
        });
      });
  };
  removeAllFromDB = () => {
    const moviesRef = this.db.collection('favoriteMovies');
    moviesRef
      .where('userId', '==', this.props.auth.uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          moviesRef.doc(doc.id).delete();
        });
      });
  };
  onRemoveAll = () => {
    this.setState(
      {
        favoriteMovies: [],
      },
      () => {
        this.props.removeAllMovies();
        this.removeAllFromDB();
      }
    );
  };
  removeMovieFromDB = (id) => {
    const moviesRef = this.db.collection('favoriteMovies');
    moviesRef
      .where('movieId', '==', id)
      .where('userId', '==', this.props.auth.uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          moviesRef.doc(doc.id).delete();
        });
      });
  };
  removeFavoriteMovie = (id) => {
    this.removeMovieFromDB(id);
    this.props.removeMovieFromFavorites(id);
    const movies = [...this.state.favoriteMovies];
    const filteredMovies = movies.filter((movie) => {
      return movie.movieId !== id;
    });
    if (this._isMounted) {
      this.setState({
        favoriteMovies: filteredMovies,
      });
    }
  };
  addMovie = (movie) => {
    const movieRef = this.db.collection('favoriteMovies');
    const query = movieRef
      .where('title', '==', movie.title)
      .where('userId', '==', movie.userId);
    query.get().then((querySnapshot) => {
      const duplicates = [];
      querySnapshot.forEach((doc) => duplicates.push(doc.data()));
      const doesExist = duplicates.filter((duplicateMovie) => {
        return (
          duplicateMovie.title === movie.title &&
          duplicateMovie.userId === movie.userId
        );
      });
      if (!doesExist.length) {
        const doc = {
          title: movie.title,
          posterPath: movie.poster_path,
          movieId: movie.id,
          userId: this.props.auth.uid,
        };
        if (this._isMounted) {
          this.db.collection('favoriteMovies').add(doc);
          this.setState((prevState) => {
            return {
              favoriteMovies: [...prevState.favoriteMovies.concat(doc)],
            };
          });
        }
      }
    });
  };
  fetchFavoriteMovies = () => {
    this.props.favoriteIds.forEach((favoriteId) => {
      tmdb
        .get(
          `/movie/${favoriteId.movieId}?api_key=${process.env.REACT_APP_TMDB_KEY}`
        )
        .then((response) => {
          const movie = response.data;
          for (let x in movie) {
            movie['userId'] = this.props.auth.uid;
          }

          this.addMovie(movie);
        });
    });
  };

  renderPosterPath = (movie) => {
    return !movie ? this.unavailablePoster : this.baseMoviePosterURL + movie;
  };

  renderFavoriteMovies = () => {
    return this.state.favoriteMovies.map((movie) => {
      const posterPath = this.renderPosterPath(movie.posterPath);
      return (
        <div className="favorite-movie" key={uuidv4()}>
          <RemoveFavoriteButton
            movieId={movie.movieId}
            removeFavoriteMovie={this.removeFavoriteMovie}
          />
          <Link to={`/movies/${movie.movieId}`}>
            <img className="movie-poster" src={posterPath} alt={movie.title} />
          </Link>
          <h2>{movie.title}</h2>
        </div>
      );
    });
  };

  renderHelpfulText() {
    return (
      <p className="helpful-text">
        Go to the{' '}
        <span>
          <Link to="/movies">Movies</Link>
        </span>{' '}
        page to add favorite movies
      </p>
    );
  }

  render() {
    const helpfulText = !this.state.favoriteMovies.length
      ? this.renderHelpfulText()
      : null;
    return (
      <div className="favorites">
        <h1>Your Favorites...</h1>
        {helpfulText}
        {this.state.favoriteMovies.length >= 2 ? (
          <RemoveAllButton onRemoveAll={this.onRemoveAll} />
        ) : null}

        <div className="favorite-movies">{this.renderFavoriteMovies()}</div>
      </div>
    );
  }
}

export default Favorites;
