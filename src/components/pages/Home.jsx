import React, { Component } from 'react';
import tmdb from '../../apis/tmdb';

import '../../css/Home.css';
class Home extends Component {
  state = {
    upComingMovies: [],
  };
  componentDidMount() {
    this.getUpComingMovies();
  }

  getUpComingMovies = async () => {
    try {
      const response = await tmdb.get('/movie/upcoming', {
        params: {
          api_key: process.env.REACT_APP_TMDB_KEY,
        },
      });
      this.setState({
        upComingMovies: response.data.results.slice(0, 6),
      });
    } catch (error) {
      console.log(error);
    }
  };

  renderUpComingMovies = () => {
    const baseMoviePosterURL = 'https://image.tmdb.org/t/p/w500';
    return this.state.upComingMovies.map((movie) => {
      return (
        <div className="upcoming-movie" key={movie.id}>
          <img src={`${baseMoviePosterURL}${movie.poster_path}`} alt="movie" />
          <h2>{movie.release_date}</h2>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="home">
        <header>
          <h1>Welcome to MovieFanz</h1>
          <p>"Home of the latest and greatest movies."</p>
          <div className="line"></div>
        </header>
        <div className="secondary-heading">
          <div className="titles">
            <h2>Upcoming Movies</h2>
            <h5>You Must See!</h5>
            <i className="fas arrow fa-arrow-alt-circle-down fa-3x"></i>
          </div>
        </div>
        <div className="upcoming-movies">{this.renderUpComingMovies()}</div>
      </div>
    );
  }
}

export default Home;
