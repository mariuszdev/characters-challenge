import React, {Component} from 'react';
import PropTypes from 'prop-types';

class App extends Component {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return (
      <div>
        Hello world
      </div>
    );
  }
}

App.propTypes = {
  onMount: PropTypes.func,
};

export default App;
