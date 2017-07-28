import React from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import {isModalOpen, closeModal} from '../modules/ui/app';

const PlainModal = ({isOpen, closeModal, children}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    contentLabel=""
  >
    {children}
  </Modal>
);

PlainModal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node,
  closeModal: PropTypes.func,
};

export default function createModalContainer(modalId) {
  const mapStateToProps = (state) => ({
    isOpen: isModalOpen(state, modalId),
  });

  const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(closeModal(modalId)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(PlainModal);
}
