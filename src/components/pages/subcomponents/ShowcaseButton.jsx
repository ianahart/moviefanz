import React from 'react';

const ShowcaseButton = (props) => {
  return (
    <button onClick={props.onButtonClick} value={props.value}>
      {props.name}
    </button>
  );
};

export default ShowcaseButton;
