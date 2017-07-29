import React from 'react';
import PropTypes from 'prop-types';
import {withHandlers} from 'recompose';

import CharactersListItem from '../../../containers/CharactersListItem';
import NewCharacterFormModal from '../../../containers/NewCharacterFormModal';
import NewCharacterForm from '../../../containers/NewCharacterForm';
import EditCharacterFormModal from '../../../containers/EditCharacterFormModal';
import EditCharacterForm from '../../../containers/EditCharacterForm';

const enhance = withHandlers({
  onSearch: ({onSearch}) => (e) => onSearch(e.target.value),
});

const CharactersList = ({characters, searchQuery, onSearch, openNewCharacterForm}) => {
  return (
    <div className="characters">
      <button type="button" className="characters--add-new" onClick={openNewCharacterForm}>Add new</button>
      <div className="characters--search">
        <input type="text" onChange={onSearch} value={searchQuery} />
      </div>
      <div className="characters--list">
        {characters.map((character) => (
          <CharactersListItem key={character._id} character={character} />
        ))}
      </div>
      <NewCharacterFormModal>
        <NewCharacterForm />
      </NewCharacterFormModal>
      <EditCharacterFormModal>
        <EditCharacterForm />
      </EditCharacterFormModal>
    </div>
  );
};

CharactersList.propTypes = {
  characters: PropTypes.array,
  onSearch: PropTypes.func,
  searchQuery: PropTypes.string,
  openNewCharacterForm: PropTypes.func,
};

export default enhance(CharactersList);
