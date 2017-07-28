import {get} from 'lodash';

export const isModalOpen = (state, modalId) =>
  get(state, ['ui', 'app', 'modalOpen']) === modalId;
