import React, { Component } from 'react';

import '../../../css/FavoriteButton.css';
class FavoriteButton extends Component {
  state = {
    isClicked: false,
  };

  handleOnClick = (e) => {
    if (!this.state.isClicked) {
      this.setState({
        isClicked: true,
      });
      this.props.addMovieToFavorites(this.props.movieId);
    } else if (this.state.isClicked) {
      this.setState({
        isClicked: false,
      });
    }
  };
  renderButtonText() {
    return !this.state.isClicked ? (
      <p className="my-0">
        <i className="fas fa-plus"></i>
        Add to Favorites
      </p>
    ) : (
      'Added to Favorites!'
    );
  }
  render() {
    const buttonText = this.renderButtonText();
    return (
      <button onClick={this.handleOnClick} className="favorites-button">
        {buttonText}
      </button>
    );
  }
}

export default FavoriteButton;
