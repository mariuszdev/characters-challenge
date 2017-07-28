import repository from './repository';
import {getFavouriteCharactersIds} from './selectors';
import {setCharacterPending, unsetCharacterPending} from '../characters';

export const ADD_FAVOURITE_CHARACTER_SUCCEED = 'ADD_FAVOURITE_CHARACTER_SUCCEED';
export const REMOVE_FAVOURITE_CHARACTER_SUCCEED = 'REMOVE_FAVOURITE_CHARACTER_SUCCEED';
export const SET_FAVOURITE_CHARACTERS = 'SET_FAVOURITE_CHARACTERS';
export const SET_USER_FETCHED = 'SET_USER_FETCHED';

export const addFavouriteCharacterSucceed = (characterId) => ({
  type: ADD_FAVOURITE_CHARACTER_SUCCEED,
  payload: characterId,
});

export const removeFavouriteCharacterSucceed = (characterId) => ({
  type: REMOVE_FAVOURITE_CHARACTER_SUCCEED,
  payload: characterId,
});

export const setFavouriteCharacters = (charactersIds) => ({
  type: SET_FAVOURITE_CHARACTERS,
  payload: charactersIds,
});

export const setUserFetched = () => ({
  type: SET_USER_FETCHED,
});

export const toogleCharacterFavourite = (characterId) => (dispatch, getState) => {
  const favouriteCharacters = getFavouriteCharactersIds(getState());

  if (favouriteCharacters.indexOf(characterId) === -1) {
    dispatch(addFavouriteCharacter(characterId));
  } else {
    dispatch(removeFavouriteCharacter(characterId));
  }
};

export const addFavouriteCharacter = (characterId) => (dispatch, getState) => {
  dispatch(setCharacterPending(characterId));

  repository.addFavouriteCharacter(characterId)
    .then(() => {
      dispatch(unsetCharacterPending(characterId));
      dispatch(addFavouriteCharacterSucceed(characterId));
    });
};

export const removeFavouriteCharacter = (characterId) => (dispatch, getState) => {
  dispatch(setCharacterPending(characterId));

  repository.removeFavouriteCharacter(characterId)
    .then(() => {
      dispatch(unsetCharacterPending(characterId));
      dispatch(removeFavouriteCharacterSucceed(characterId));
    });
};

export const fetchUser = () => (dispatch) => {
  repository.getFavouriteCharacters()
    .then((charactersIds) => {
      dispatch(setFavouriteCharacters(charactersIds));
      dispatch(setUserFetched());
    });
};
