import {connect} from 'react-redux';

import CharactersList from '../components/characters/CharactersList';
import {getCharacters} from '../modules/domain/characters';

const mapStateToProps = (state) => ({
  characters: getCharacters(state),
});

export default connect(mapStateToProps)(CharactersList);
