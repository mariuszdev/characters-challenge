import axios from 'axios';

import {apiUrl} from '../../../../config.json';
import {tryRequestUntilSuccess} from '../../../utils';

export default {
  addFavouriteCharacter: (characterId) => (
    tryRequestUntilSuccess(() => axios.post(`${apiUrl}/favourites/${characterId}`))
  ),
  removeFavouriteCharacter: (characterId) => (
    tryRequestUntilSuccess(() => axios.delete(`${apiUrl}/favourites/${characterId}`))
  ),
  getFavouriteCharacters: () => (
    tryRequestUntilSuccess(() => axios.get(`${apiUrl}/favourites`))
      .then((response) => response.data.favourites)
  ),
};
