import React from 'react';
import PropTypes from 'prop-types';

const CharactersListItem = ({character: {name}, pending, onRemoveClick}) => {
  return (
    <div className="characters-list-item">
      {name} <button type="button" disabled={pending} onClick={onRemoveClick}>Remove</button>
    </div>
  );
};

CharactersListItem.propTypes = {
  character: PropTypes.object,
  onRemoveClick: PropTypes.func,
  pending: PropTypes.bool,
};

export default CharactersListItem;
