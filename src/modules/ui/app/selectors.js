import {get} from 'lodash';

export const isModalOpen = (state, modalId) =>
  get(state, ['ui', 'app', 'modalOpen']) === modalId;

export const isAnyModalOpen = (state) =>
  get(state, ['ui', 'app', 'modalOpen']) !== null;
