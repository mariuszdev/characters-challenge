import {openModal, NEW_CHARACTER_FORM_MODAL} from '../app';

export const SEARCH_CHARACTERS = 'SEARCH_CHARACTERS';

export const searchCharacters = (query) => ({
  type: SEARCH_CHARACTERS,
  payload: query,
});

export const openNewCharacterForm = () => (dispatch) => {
  dispatch(openModal(NEW_CHARACTER_FORM_MODAL));
};
