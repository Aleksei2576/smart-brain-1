import React from 'react';

const Rank = ({name, entries}) => {
  return (
    <p className = 'center f1 white'>{`${name}, your rank is #${entries}`}</p>
  );
}

export default Rank;
