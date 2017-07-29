import {getFormValues, stopSubmit, startSubmit} from 'redux-form';

import {
  openModal,
  closeModal,
  isAnyModalOpen,
  NEW_CHARACTER_FORM_MODAL,
  NEW_CHARACTER_FORM,
  EDIT_CHARACTER_FORM_MODAL,
  EDIT_CHARACTER_FORM,
} from '../app';
import {
  repository,
  createCharacter,
  updateCharacter,
  setCharacterPending,
  unsetCharacterPending,
} from '../../domain/characters';
import {transformFormData} from './utils';
import store from '../../../store';

export const SEARCH_CHARACTERS = 'SEARCH_CHARACTERS';
export const SET_CHARACTER_EDITED = 'SET_CHARACTER_EDITED';
export const CLEAR_CHARACTER_EDITED = 'CLEAR_CHARACTER_EDITED';

const MODAL_CLOSE_RESOLVED = 'MODAL_CLOSE_RESOLVED';

const watchModalClose = () => new Promise((resolve) => {
  const unsubscribe = store.subscribe(() => {
    if (!isAnyModalOpen(store.getState())) {
      unsubscribe();
      resolve(MODAL_CLOSE_RESOLVED);
    }
  });
});

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

  dispatch(startSubmit(NEW_CHARACTER_FORM));

  Promise.race([
    watchModalClose(),
    repository.createCharacter(dataTransformed)
      .then((_id) => {
        dispatch(createCharacter({
          ...dataTransformed,
          _id,
        }));
      }),
  ])
    .then((value) => {
      if (value !== MODAL_CLOSE_RESOLVED) {
        dispatch(closeModal(NEW_CHARACTER_FORM_MODAL));
      }
    }, (errors) => dispatch(stopSubmit(NEW_CHARACTER_FORM, errors)));
};

export const handleEditCharacterFormSubmit = () => (dispatch, getState) => {
  const {_id, ...data} = getFormValues(EDIT_CHARACTER_FORM)(getState());
  const dataTransformed = transformFormData(data);

  dispatch(startSubmit(EDIT_CHARACTER_FORM));
  dispatch(setCharacterPending(_id));

  Promise.race([
    watchModalClose(),
    repository.editCharacter(_id, dataTransformed)
      .then(() => {
        dispatch(updateCharacter({
          ...dataTransformed,
          _id,
        }));
        dispatch(unsetCharacterPending(_id));
      })
      .catch((errors) => {
        dispatch(unsetCharacterPending(_id));
        return Promise.reject(errors);
      }),
  ])
    .then((value) => {
      if (value !== MODAL_CLOSE_RESOLVED) {
        dispatch(closeModal(EDIT_CHARACTER_FORM_MODAL));
      }

      dispatch(clearCharacterEdited());
    }, (errors) => dispatch(stopSubmit(EDIT_CHARACTER_FORM, errors)));
};
