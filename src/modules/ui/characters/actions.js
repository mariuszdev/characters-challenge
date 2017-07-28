export const SEARCH_CHARACTERS = 'SEARCH_CHARACTERS';

export const searchCharacters = (query) => ({
  type: SEARCH_CHARACTERS,
  payload: query,
});
