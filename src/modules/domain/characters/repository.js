import axios from 'axios';

import {apiUrl} from '../../../../config.json';

export default {
  fetchCharacters: () => (
    axios.get(`${apiUrl}/characters`).then((response) => response.data.characters)
  ),
};
