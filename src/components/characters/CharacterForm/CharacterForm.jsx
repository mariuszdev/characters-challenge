import React from 'react';
import {Field} from 'redux-form';
import {withHandlers} from 'recompose';
import PropTypes from 'prop-types';

import './styles.sass';

// TODO: remove duplication
const renderInputField = ({input, meta, label, ...props}) => (
  <div className={`form-group ${meta.error ? 'has-error' : ''}`}>
    <label className="control-label" htmlFor="name">{label}</label>
    <input {...input} {...props} className="form-control" />
    {meta.error &&
     <span className="help-block">{meta.error}</span>}
  </div>
);

renderInputField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
};

const renderCheckboxField = ({input, meta, label, ...props}) => (
  <div className={`form-group ${meta.error ? 'has-error' : ''}`}>
    <label className="control-label" htmlFor="name">{label}</label>
    <div className="checkbox">
      <label>
        <input {...input} {...props} />
      </label>
    </div>
    {meta.error &&
     <span className="help-block">{meta.error}</span>}
  </div>
);

renderCheckboxField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
};

const enhance = withHandlers({
  handleSubmit: ({handleSubmit}) => (e) => {
    e.preventDefault();
    handleSubmit(e);
  },
});

const CharacterForm = ({handleSubmit}) => (
  <form className="character-form" onSubmit={handleSubmit}>
    <div className="row">
      <div className="col-xs-4">
        <Field
          id="name"
          name="name"
          label="Name"
          component={renderInputField}
          placeholder="Anakin Skywalker"
        />
      </div>
      <div className="col-xs-4">
        <Field
          id="birth_year"
          name="birth_year"
          label="Birth year"
          component={renderInputField}
          placeholder="19"
         />
      </div>
      <div className="col-xs-4">
        <div className="form-group">
          <label>ABY/BBY</label>
          <Field className="form-control" name="era" component="select">
            <option value="ABY">ABY</option>
            <option value="BBY">BBY</option>
          </Field>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-xs-4">
        <Field
          id="height"
          name="height"
          label="Height"
          component={renderInputField}
          type="number"
          placeholder=" 172"
        />
      </div>
      <div className="col-xs-4">
        <Field
          id="mass"
          name="mass"
          label="Mass"
          component={renderInputField}
          type="number"
          placeholder="43"
        />
      </div>
      <div className="col-xs-4">
        <Field
          id="hair_color"
          name="hair_color"
          label="Hair color"
          component={renderInputField}
          placeholder="Blond"
        />
      </div>
    </div>
    <div className="row">
      <div className="col-xs-4">
        <Field
          id="skin_color"
          name="skin_color"
          label="Skin color"
          component={renderInputField}
          placeholder="Fair"
        />
      </div>
      <div className="col-xs-4">
        <Field
          id="eye_color"
          name="eye_color"
          label="Eye color"
          component={renderInputField}
          className="form-control"
          placeholder="Blue"
        />
      </div>
      <div className="col-xs-4">
        <Field
          type="checkbox"
          name="is_male"
          label="Is male"
          component={renderCheckboxField}
        />
      </div>
    </div>
    <button type="submit" className="btn btn-success character-form--btn-submit">Save</button>
  </form>
);

CharacterForm.propTypes = {
  handleSubmit: PropTypes.func,
};

export default enhance(CharacterForm);
