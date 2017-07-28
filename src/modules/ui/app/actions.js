export const APP_BOOTED = 'APP_BOOTED';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const appBooted = () => ({
  type: APP_BOOTED,
});

export const openModal = (modalId) => ({
  type: OPEN_MODAL,
  payload: modalId,
});

export const closeModal = (modalId) => ({
  type: CLOSE_MODAL,
  payload: modalId,
});
