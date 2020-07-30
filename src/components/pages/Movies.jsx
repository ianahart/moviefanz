import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import tmdb from '../../apis/tmdb';
import MovieForm from './subcomponents/MovieForm';
import FavoriteButton from './subcomponents/FavoriteButton';
import '../../css/Movies.css';

import ShowcaseButton from './subcomponents/ShowcaseButton';
import Movie from './subcomponents/Movie';
class Movies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchMovies: [],
      showcaseMovies: [],
      buttonSelection: '',
      searchError: '',
    };
    this.baseMoviePosterURL = 'https://image.tmdb.org/t/p/w500';
    this.unavailablePoster =
      'https://via.placeholder.com/150?text=photo+unavailable';
  }
  onFormSubmit = (movie) => {
    this.fetchSearchMovies(movie);
  };

  onShowcaseButtonClick = (e) => {
    const selection = e.target.value;
    this.setState(
      {
        buttonSelection: selection,
      },
      () => this.FetchShowcaseMovies(this.state.buttonSelection)
    );
  };

  fetchSearchMovies = async (searchTerm) => {
    if (searchTerm === '') {
      return;
    }
    const error = `Unable to find movie with the title: "${searchTerm}"`;
    try {
      const response = await tmdb.get('/search/movie', {
        params: {
          api_key: process.env.REACT_APP_TMDB_KEY,
          query: searchTerm,
        },
      });
      if (!response.data.results.length) {
        this.setState({
          searchError: error,
        });
      } else {
        this.setState({
          searchError: '',
        });
      }
      this.setState({
        searchMovies: response.data.results,
        showcaseMovies: [],
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  FetchShowcaseMovies = async (selection) => {
    try {
      const response = await tmdb.get(`/movie${selection}`, {
        params: {
          api_key: process.env.REACT_APP_TMDB_KEY,
        },
      });
      if (!response.data.results) {
        this.setState({ showcaseMovies: response.data, searchMovies: [] });
      } else {
        this.setState({
          showcaseMovies: response.data.results,
          searchMovies: [],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  renderSearchMovies = () => {
    return this.state.searchMovies.map((movie) => {
      return (
        <Movie
          key={movie.id}
          addMovieToFavorites={this.props.addMovieToFavorites}
          movie={movie}
          moviePoster="movie-poster"
          className="search-movie"
        />
      );
    });
  };

  renderShowCaseMovies = () => {
    if (!Array.isArray(this.state.showcaseMovies)) {
      return this.renderLatestMovie();
    }
    return this.state.showcaseMovies.map((movie) => {
      return (
        <Movie
          key={movie.id}
          addMovieToFavorites={this.props.addMovieToFavorites}
          movie={movie}
          moviePoster="movie-poster"
          className="showcase-movie"
        />
      );
    });
  };

  renderLatestMovie = () => {
    const movie = this.state.showcaseMovies;
    const image =
      !movie.poster_path || movie.adult === true
        ? this.unavailablePoster
        : `${this.baseMoviePosterURL}${movie.poster_path}`;
    const movieTitle = movie.adult ? 'Explicit Content' : movie.title;
    return (
      <div className="latest-movie" key={movie.id}>
        <Link to={`/movies/${movie.id}`}>
          <img src={image} alt={movieTitle} />
        </Link>
        <h5>{movieTitle}</h5>
        <FavoriteButton
          addMovieToFavorites={this.props.addMovieToFavorites}
          movieId={movie.id}
        />
      </div>
    );
  };

  render() {
    return (
      <div className="movies">
        <div className="movie-search">
          <h3 className="py-5">Movie Search:</h3>
          <h4>{this.state.searchError ? this.state.searchError : null}</h4>
          <MovieForm onSubmit={this.onFormSubmit} />
          <div className="search-movies">{this.renderSearchMovies()}</div>
        </div>
        <div className="showcase">
          <div className="divider">
            <h3>Featured:</h3>
          </div>
          <div className="showcase-buttons">
            <ShowcaseButton
              onButtonClick={this.onShowcaseButtonClick}
              value="/now_playing"
              name="Now Playing"
            />
            <ShowcaseButton
              onButtonClick={this.onShowcaseButtonClick}
              value="/latest"
              name="Latest"
            />
            <ShowcaseButton
              onButtonClick={this.onShowcaseButtonClick}
              value="/top_rated"
              name="Top Rated"
            />
          </div>
        </div>
        <div className="showcase-movies">{this.renderShowCaseMovies()}</div>
      </div>
    );
  }
}
export default Movies;
