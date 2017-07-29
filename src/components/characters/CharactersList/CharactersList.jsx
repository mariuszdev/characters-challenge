import React from 'react';
import PropTypes from 'prop-types';
import {branch, renderComponent, withHandlers} from 'recompose';

import CharactersListItem from '../../../containers/CharactersListItem';
import NewCharacterFormModal from '../../../containers/NewCharacterFormModal';
import NewCharacterForm from '../../../containers/NewCharacterForm';
import EditCharacterFormModal from '../../../containers/EditCharacterFormModal';
import EditCharacterForm from '../../../containers/EditCharacterForm';
import Loader from '../CharactersLoader';

import './style.sass';

const enhance = branch(
  ({isFetched}) => !isFetched,
  renderComponent(Loader),
  withHandlers({
    onSearch: ({onSearch}) => (e) => onSearch(e.target.value),
  })
);

const CharactersList = ({characters, searchQuery, onSearch, openNewCharacterForm}) => {
  return (
    <div className="characters">
      <h1>Star Wars Characters</h1>
      <div className="character__header">
        <div className="characters__search">
          <input
            className="form-control"
            type="text"
            onChange={onSearch}
            value={searchQuery}
            placeholder="Search characters"
          />
        </div>
        <button
          type="button"
          className="btn btn-success characters__add-new"
          onClick={openNewCharacterForm}
        >
          Add new <span className="glyphicon glyphicon-plus" />
        </button>
      </div>
      <div className="characters__list list-group">
        {characters.map((character) => (
          <CharactersListItem key={character._id} character={character} className="list-group-item" />
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
