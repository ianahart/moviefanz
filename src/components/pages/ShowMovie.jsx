import React, { Component } from 'react';
import tmdb from '../../apis/tmdb';

import '../../css/ShowMovie.css';

class ShowMovie extends Component {
  constructor(props) {
    super(props);
    this.baseMoviePosterURL = 'https://image.tmdb.org/t/p/w500';
    this.state = {
      movieToShow: {},
    };
  }

  componentDidMount() {
    this.fetchShowMovie();
  }

  fetchShowMovie = async () => {
    const id = this.props.match.params.id;
    const response = await tmdb.get(`/movie/${id}`, {
      params: {
        api_key: process.env.REACT_APP_TMDB_KEY,
      },
    });
    this.setState({
      movieToShow: response.data,
    });
  };
  renderGenres(genres) {
    if (genres === undefined) return;
    return genres.map((genre, index) => {
      return index + 1 === genres.length ? (
        <span key={genre.id}>{genre.name}</span>
      ) : (
        <span key={genre.id}>{genre.name}, </span>
      );
    });
  }
  handleBackButton = () => {
    this.props.history.goBack();
  };

  renderMoviePath(path) {
    return path.includes('undefined') ? '' : path;
  }

  renderMovie = () => {
    const movie = this.state.movieToShow;
    const movieStr = `${this.baseMoviePosterURL}${movie.poster_path}`;
    const moviePath = this.renderMoviePath(movieStr);
    const tagLine =
      movie.tagline === null || movie.tagline === ''
        ? ''
        : `"${movie.tagline}"`;

    return (
      <div key={movie.id} className="movie">
        <div className="line"></div>
        <h3>{movie.title}</h3>
        <p className="tagline">{tagLine}</p>
        <div className="line"></div>
        <div className="image-container">
          <div className="left-arrow-container">
            <i
              onClick={this.handleBackButton}
              className="fas fa-arrow-circle-left fa-3x"
            ></i>
          </div>
          <p className="vote-average">AVG: {movie.vote_average}</p>
          <img className="poster" src={moviePath} alt={movie.title} />
        </div>
        <p className="mt-2">
          Release Date: <span>{movie.release_date}</span>
        </p>
        <p>
          Runtime: <span>{movie.runtime} minutes</span>
        </p>
        <p className="genres">Genres: {this.renderGenres(movie.genres)}</p>
        <p className="overview">{movie.overview}</p>
      </div>
    );
  };

  render() {
    return <div className="show-movie">{this.renderMovie()}</div>;
  }
}

export default ShowMovie;
