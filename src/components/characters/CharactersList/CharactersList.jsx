import React from 'react';
import PropTypes from 'prop-types';
import {withHandlers} from 'recompose';

import CharactersListItem from '../../../containers/CharactersListItem';

const enhance = withHandlers({
  onSearch: ({onSearch}) => (e) => onSearch(e.target.value),
});

const CharactersList = ({characters, searchQuery, onSearch}) => {
  return (
    <div className="characters">
      <div className="characters--search">
        <input type="text" onChange={onSearch} value={searchQuery} />
      </div>
      <div className="characters--list">
        {characters.map((character) => (
          <CharactersListItem key={character._id} character={character} />
        ))}
      </div>
    </div>
  );
};

CharactersList.propTypes = {
  characters: PropTypes.array,
  onSearch: PropTypes.func,
  searchQuery: PropTypes.string,
};

export default enhance(CharactersList);
