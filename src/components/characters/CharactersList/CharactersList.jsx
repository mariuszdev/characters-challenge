import React from 'react';
import PropTypes from 'prop-types';

import CharactersListItem from '../../../containers/CharactersListItem';

const CharactersList = ({characters}) => {
  return (
    <div className="characters-list">
      {characters.map((character) => (
        <CharactersListItem key={character._id} character={character} />
      ))}
    </div>
  );
};

CharactersList.propTypes = {
  characters: PropTypes.array,
};

export default CharactersList;
