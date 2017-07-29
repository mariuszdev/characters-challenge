import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';

import {NEW_CHARACTER_FORM} from '../modules/ui/app';
import {handleNewCharacterFormSubmit} from '../modules/ui/characters';
import PlainCharacterForm from '../components/characters/CharacterForm';

const mapDispatchToProps = {
  handleSubmit: handleNewCharacterFormSubmit,
};

const CharacterForm = reduxForm({
  form: NEW_CHARACTER_FORM,
  initialValues: {
    is_male: false,
    era: 'ABY',
  },
})(PlainCharacterForm);

export default connect(null, mapDispatchToProps)(CharacterForm);
