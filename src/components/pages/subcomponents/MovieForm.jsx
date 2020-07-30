import React, { Component } from 'react';

import '../../../css/MovieForm.css';

class MovieForm extends Component {
  state = {
    searchTerm: '',
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchTerm);
    this.setState({
      searchTerm: '',
    });
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="movie">Enter Movie:</label>
          <input
            onChange={(e) => this.setState({ searchTerm: e.target.value })}
            type="text"
            className="form-control"
            id="movie"
            value={this.state.searchTerm}
          />
        </div>
        <div className="btn-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}

export default MovieForm;
