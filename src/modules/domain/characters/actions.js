import repository from './repository';

export const SET_CHARACTERS = 'SET_CHARACTERS';
export const SET_CHARACTER_PENDING = 'SET_CHARACTER_PENDING';
export const UNSET_CHARACTER_PENDING = 'UNSET_CHARACTER_PENDING';
export const REMOVE_CHARACTER_SUCCEED = 'REMOVE_CHARACTER_SUCCEED';
export const CREATE_CHARACTER = 'CREATE_CHARACTER';
export const UPDATE_CHARACTER = 'UPDATE_CHARACTER';

const setCharacters = (characters) => ({
  type: SET_CHARACTERS,
  payload: characters,
});

export const setCharacterPending = (characterId) => ({
  type: SET_CHARACTER_PENDING,
  payload: characterId,
});

export const unsetCharacterPending = (characterId) => ({
  type: UNSET_CHARACTER_PENDING,
  payload: characterId,
});

export const removeCharacterSucceed = (characterId) => ({
  type: REMOVE_CHARACTER_SUCCEED,
  payload: characterId,
});

export const createCharacter = (data) => ({
  type: CREATE_CHARACTER,
  payload: data,
});

export const updateCharacter = (data) => ({
  type: UPDATE_CHARACTER,
  payload: data,
});

export const fetchCharacters = () => (dispatch, getState) => {
  repository.fetchCharacters()
    .then((characters) => {
      dispatch(setCharacters(characters));
    });
};

export const removeCharacter = (characterId) => (dispatch, getState) => {
  dispatch(setCharacterPending(characterId));

  repository.removeCharacter(characterId)
    .then(() => {
      dispatch(unsetCharacterPending(characterId));
      dispatch(removeCharacterSucceed(characterId));
    });
};
