import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CharactersList from '../containers/CharactersList';
import NewCharacterFormModal from '../containers/NewCharacterFormModal';

class App extends Component {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return (
      <div>
        <NewCharacterFormModal>
          Test
        </NewCharacterFormModal>
        <CharactersList />
      </div>
    );
  }
}

App.propTypes = {
  onMount: PropTypes.func,
};

export default App;
