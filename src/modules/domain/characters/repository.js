import axios from 'axios';

import {apiUrl} from '../../../../config.json';
import {tryRequestUntilSuccess} from '../../../utils';

export default {
  fetchCharacters: () => (
    tryRequestUntilSuccess(() => axios.get(`${apiUrl}/characters`))
      .then((response) => response.data.characters)
  ),
  removeCharacter: (characterId) => (
    tryRequestUntilSuccess(() => axios.delete(`${apiUrl}/characters/${characterId}`))
  ),
  createCharacter: (data) => (
    tryRequestUntilSuccess(() => axios.post(`${apiUrl}/characters`, data))
      .then((response) => response.data.id)
      .catch((error) => Promise.reject(error.response.data))
  ),
  editCharacter: (characterId, data) => (
    tryRequestUntilSuccess(() => axios.put(`${apiUrl}/characters/${characterId}`, data))
      .catch((error) => Promise.reject(error.response.data))
  ),
};
