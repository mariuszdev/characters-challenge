import axios from 'axios';

import {apiUrl} from '../../../../config.json';

export default {
  fetchCharacters: () => (
    axios.get(`${apiUrl}/characters`).then((response) => response.data.characters)
  ),
  removeCharacter: (characterId) => (
    axios.delete(`${apiUrl}/characters/${characterId}`)
  ),
  createCharacter: (data) => (
    axios.post(`${apiUrl}/characters`, data)
      .then((response) => response.data.id)
      .catch((error) => Promise.reject(error.response.data))
  ),
  editCharacter: (characterId, data) => (
    axios.put(`${apiUrl}/characters/${characterId}`, data)
      .catch((error) => Promise.reject(error.response.data))
  ),
};
