import repository from './repository';

export const SET_CHARACTERS = 'SET_CHARACTERS';

const setCharacters = (characters) => ({
  type: SET_CHARACTERS,
  payload: characters,
});

export const fetchCharacters = () => (dispatch, getState) => {
  repository.fetchCharacters()
    .then((characters) => {
      dispatch(setCharacters(characters));
    });
};
