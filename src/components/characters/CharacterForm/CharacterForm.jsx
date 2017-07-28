import React from 'react';

import './styles.sass';

const CharacterForm = () => {
  return (
    <form className="character-form">
      <div className="row">
        <div className="col-xs-4">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" name="name" placeholder="Anakin Skywalker" />
          </div>
        </div>
        <div className="col-xs-4">
          <div className="form-group">
            <label htmlFor="birth_yearme">Birth year</label>
            <input type="text" className="form-control" id="birth_year" name="birth_year" placeholder="19" />
          </div>
        </div>
        <div className="col-xs-4">
          <div className="form-group">
            <label>ABY/BBY</label>
            <select className="form-control">
              <option name="aby">ABY</option>
              <option name="bby">BBY</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-4">
          <div className="form-group">
            <label htmlFor="height">Height</label>
            <input type="number" className="form-control" id="height" name="height" placeholder=" 172" />
          </div>
        </div>
        <div className="col-xs-4">
          <div className="form-group">
            <label htmlFor="mass">Mass</label>
            <input type="number" className="form-control" id="mass" name="mass" placeholder="43" />
          </div>
        </div>
        <div className="col-xs-4">
          <div className="form-group">
            <label htmlFor="hair_color">Hair color</label>
            <input type="text" className="form-control" id="hair_color" name="hair_color" placeholder="Blong" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-4">
          <div className="form-group">
            <label htmlFor="skin_color">Skin color</label>
            <input type="text" className="form-control" id="skin_color" name="skin_color" placeholder="Fair" />
          </div>
        </div>
        <div className="col-xs-4">
          <div className="form-group">
            <label htmlFor="neye_colorame">Eye color</label>
            <input type="text" className="form-control" id="eye_color" name="eye_color" placeholder="Blue" />
          </div>
        </div>
        <div className="col-xs-4">
          <div className="form-group">
            <label>Gender</label>
            <div className="checkbox">
              <label>
                <input type="checkbox" name="is_male" /> Is male
              </label>
            </div>
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-success character-form--btn-submit">Save</button>
    </form>
  );
};

export default CharacterForm;
