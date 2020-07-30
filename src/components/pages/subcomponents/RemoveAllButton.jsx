import React from 'react';

import '../../../css/RemoveAllButton.css';

class RemoveAllButton extends React.Component {
  render() {
    return (
      <div className="text-center mt-3">
        <button onClick={this.props.onRemoveAll} className="remove-all-button">
          Clear All
        </button>
      </div>
    );
  }
}

export default RemoveAllButton;
