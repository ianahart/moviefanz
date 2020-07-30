import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import tmdb from '../../apis/tmdb';

import '../../css/Popular.css';

class Popular extends Component {
  constructor(props) {
    super(props);
    this.baseMoviePosterURL = 'https://image.tmdb.org/t/p/w500';
    this.state = {
      popularMovies: [],
    };
  }

  componentDidMount() {
    this.fetchPopularMovies();
  }

  fetchPopularMovies = async () => {
    const response = await tmdb.get('/movie/popular', {
      params: {
        api_key: process.env.REACT_APP_TMDB_KEY,
        page: 1,
      },
    });
    this.setState({
      popularMovies: response.data.results,
    });
  };

  addVoteCountCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  renderPopularMovies = () => {
    return this.state.popularMovies.map((movie) => {
      return (
        <div className="popular-movie" key={movie.id}>
          <Link to={`/movies/${movie.id}`}>
            <img
              alt={movie.title}
              className="movie-poster"
              src={`${this.baseMoviePosterURL}${movie.poster_path}`}
            />
          </Link>
          <h2 className="pt-1">{movie.title}</h2>
          <p className="popularity">
            Popularity: <span>{Math.round(movie.popularity)}%</span>
          </p>
          <p className="votes">
            Votes: <span>{this.addVoteCountCommas(movie.vote_count)}</span>
          </p>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="popular">
        <div>
          <h1 className="pt-5 py-1">Popular Movies</h1>
          <div className="line"></div>
        </div>
        <div className="popular-movies">{this.renderPopularMovies()}</div>
      </div>
    );
  }
}

export default Popular;
