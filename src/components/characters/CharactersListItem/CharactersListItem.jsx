import React from 'react';
import PropTypes from 'prop-types';

const CharactersListItem = ({name}) => {
  return (
    <div className="characters-list-item">
      {name}
    </div>
  );
};

CharactersListItem.propTypes = {
  name: PropTypes.string,
};

export default CharactersListItem;
