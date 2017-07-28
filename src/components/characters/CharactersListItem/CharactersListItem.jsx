import React from 'react';
import PropTypes from 'prop-types';

const CharactersListItem = ({
  character: {name},
  pending,
  favourite,
  onRemoveClick,
  onToggleFavourite,
}) => {
  return (
    <div className="characters-list-item">
      {name}
      <button type="button" disabled={pending} onClick={onRemoveClick}>Remove</button>
      <button
        type="button"
        disabled={pending}
        onClick={onToggleFavourite}
      >
        {favourite ? 'Favourited' : 'Favourite'}
      </button>
    </div>
  );
};

CharactersListItem.propTypes = {
  character: PropTypes.object,
  onRemoveClick: PropTypes.func,
  pending: PropTypes.bool,
  favourite: PropTypes.bool,
  onToggleFavourite: PropTypes.func,
};

export default CharactersListItem;
