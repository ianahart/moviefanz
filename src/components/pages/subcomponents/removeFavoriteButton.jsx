import React, { Component } from 'react';

import '../../../css/removeFavoriteButton.css';

class RemoveFavoriteButton extends Component {
  handleBtnRemove = () => {
    this.props.removeFavoriteMovie(this.props.movieId);
  };
  render() {
    return (
      <i
        onClick={this.handleBtnRemove}
        className="remove-button far fa-times-circle"
      ></i>
    );
  }
}

export default RemoveFavoriteButton;
