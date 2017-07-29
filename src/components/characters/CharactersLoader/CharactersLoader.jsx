import React, {Component} from 'react';

import spinner from './spinner.svg'; // eslint-disable-line

import './style.sass';

class Loader extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      display: false,
    };
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({
        display: true,
      });
    }, 200);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const {display} = this.state;

    if (!display) {
      return null;
    }

    return (
      <div className="characters-loader">
        <svg>
          <use xlinkHref="#spinner"></use>
        </svg>
      </div>
    );
  }
}

export default Loader;
