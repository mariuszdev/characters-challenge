import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CharactersList from '../containers/CharactersList';

class App extends Component {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return (
      <div>
        <CharactersList />
      </div>
    );
  }
}

App.propTypes = {
  onMount: PropTypes.func,
};

export default App;
