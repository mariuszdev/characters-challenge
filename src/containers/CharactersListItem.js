import {connect} from 'react-redux';

import {removeCharacter, isCharacterPending} from '../modules/domain/characters';
import CharactersListItem from '../components/characters/CharactersListItem';

const mapStateToProps = (state, {character: {_id}}) => ({
  pending: isCharacterPending(state, _id),
});

const mapDispatchToProps = (dispatch, {character}) => ({
  onRemoveClick: () => dispatch(removeCharacter(character._id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CharactersListItem);
