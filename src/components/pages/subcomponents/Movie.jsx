import React from 'react';
import FavoriteButton from './FavoriteButton';
import { Link } from 'react-router-dom';
class Movie extends React.Component {
  constructor(props) {
    super(props);

    this.baseMoviePosterURL = 'https://image.tmdb.org/t/p/w500';
    this.unavailablePoster =
      'https://via.placeholder.com/150?text=photo+unavailable';
  }
  renderPosterPath = (movie) => {
    return !movie ? this.unavailablePoster : this.baseMoviePosterURL + movie;
  };
  render() {
    const { movie } = this.props;
    const image = this.renderPosterPath(movie.poster_path);
    return (
      <div className={this.props.className}>
        <Link to={`/movies/${movie.id}`}>
          <img
            className={this.props.moviePoster}
            src={image}
            alt={movie.title}
          />
        </Link>
        <h5>{movie.title}</h5>
        <FavoriteButton
          addMovieToFavorites={this.props.addMovieToFavorites}
          movieId={movie.id}
        />
      </div>
    );
  }
}

export default Movie;
