import {connect} from 'react-redux';

import CharactersList from '../components/characters/CharactersList';
import {getCharactersSearched} from '../modules/domain/characters';
import {getSearchQuery, searchCharacters} from '../modules/ui/characters';

const mapStateToProps = (state) => ({
  characters: getCharactersSearched(state),
  searchQuery: getSearchQuery(state),
});

const mapDispatchToProps = {
  onSearch: searchCharacters,
};

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList);
