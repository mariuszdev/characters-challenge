import {getFormValues, stopSubmit} from 'redux-form';

import {openModal, closeModal, NEW_CHARACTER_FORM_MODAL, NEW_CHARACTER_FORM} from '../app';
import {repository, createCharacter} from '../../domain/characters';

export const SEARCH_CHARACTERS = 'SEARCH_CHARACTERS';

export const searchCharacters = (query) => ({
  type: SEARCH_CHARACTERS,
  payload: query,
});

export const openNewCharacterForm = () => (dispatch) => {
  dispatch(openModal(NEW_CHARACTER_FORM_MODAL));
};

export const handleNewCharacterFormSubmit = (data) => (dispatch, getState) => {
  const data = getFormValues(NEW_CHARACTER_FORM)(getState());
  const dataTransformed = Object.assign({}, data, {
    birth_year: data.birth_year === '' ? null : data.birth_year + data.era,
  });

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
