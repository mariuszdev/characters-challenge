import axios from 'axios';

import {apiUrl} from '../../../../config.json';

export default {
  addFavouriteCharacter: (characterId) => (
    axios.post(`${apiUrl}/favourites/${characterId}`)
  ),
  removeFavouriteCharacter: (characterId) => (
    axios.delete(`${apiUrl}/favourites/${characterId}`)
  ),
  getFavouriteCharacters: () => (
    axios.get(`${apiUrl}/favourites`).then((response) => response.data.favourites)
  ),
};
