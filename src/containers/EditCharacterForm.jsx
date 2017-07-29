import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';

import {EDIT_CHARACTER_FORM} from '../modules/ui/app';
import {handleEditCharacterFormSubmit, getCharacterEditedFormData} from '../modules/ui/characters';
import PlainCharacterForm from '../components/characters/CharacterForm';

const mapStateToProps = (state) => ({
  initialValues: getCharacterEditedFormData(state),
});

const mapDispatchToProps = {
  handleSubmit: handleEditCharacterFormSubmit,
};

const CharacterForm = reduxForm({
  form: EDIT_CHARACTER_FORM,
})(PlainCharacterForm);

export default connect(mapStateToProps, mapDispatchToProps)(CharacterForm);
