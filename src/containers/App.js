import {connect} from 'react-redux';

import App from '../components/App';
import {appBooted} from '../modules/ui/app';

const mapDispatchToProps = {
  onMount: appBooted,
};

export default connect(null, mapDispatchToProps)(App);
