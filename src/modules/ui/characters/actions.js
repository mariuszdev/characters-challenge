import {getFormValues, stopSubmit} from 'redux-form';

import {
  openModal,
  closeModal,
  NEW_CHARACTER_FORM_MODAL,
  NEW_CHARACTER_FORM,
  EDIT_CHARACTER_FORM_MODAL,
  EDIT_CHARACTER_FORM,
} from '../app';
import {repository, createCharacter, updateCharacter} from '../../domain/characters';
import {transformFormData} from './utils';

export const SEARCH_CHARACTERS = 'SEARCH_CHARACTERS';
export const SET_CHARACTER_EDITED = 'SET_CHARACTER_EDITED';
export const CLEAR_CHARACTER_EDITED = 'CLEAR_CHARACTER_EDITED';

export const searchCharacters = (query) => ({
  type: SEARCH_CHARACTERS,
  payload: query,
});

export const openNewCharacterForm = () => (dispatch) => {
  dispatch(openModal(NEW_CHARACTER_FORM_MODAL));
};

export const setCharacterEdited = (characterId) => ({
  type: SET_CHARACTER_EDITED,
  payload: characterId,
});

export const clearCharacterEdited = () => ({
  type: CLEAR_CHARACTER_EDITED,
});

export const openEditCharacterForm = (characterId) => (dispatch) => {
  dispatch(setCharacterEdited(characterId));
  dispatch(openModal(EDIT_CHARACTER_FORM_MODAL));
};

export const editCharacter = (characterId) => (dispatch) => {
  dispatch(openEditCharacterForm(characterId));
};

export const handleNewCharacterFormSubmit = (data) => (dispatch, getState) => {
  const data = getFormValues(NEW_CHARACTER_FORM)(getState());
  const dataTransformed = transformFormData(data);

  repository.createCharacter(dataTransformed)
    .then((_id) => {
      dispatch(closeModal(NEW_CHARACTER_FORM_MODAL));

      dispatch(createCharacter({
        ...dataTransformed,
        _id,
      }));
    })
    .catch((errors) => dispatch(stopSubmit(NEW_CHARACTER_FORM, errors)));
};

export const handleEditCharacterFormSubmit = () => (dispatch, getState) => {
  const {_id, ...data} = getFormValues(EDIT_CHARACTER_FORM)(getState());
  const dataTransformed = transformFormData(data);

  repository.editCharacter(_id, dataTransformed)
    .then(() => {
      dispatch(closeModal(EDIT_CHARACTER_FORM_MODAL));
      dispatch(clearCharacterEdited());

      dispatch(updateCharacter({
        ...dataTransformed,
        _id,
      }));
    })
    .catch((errors) => dispatch(stopSubmit(EDIT_CHARACTER_FORM, errors)));
};
