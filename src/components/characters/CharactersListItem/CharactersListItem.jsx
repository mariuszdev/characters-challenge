import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './style.sass';

const CharactersListItem = ({
  character: {
    name,
    height,
    mass,
    skin_color,
    eye_color,
    hair_color,
    birth_year,
    is_male,
  },
  className,
  pending,
  favourite,
  onRemoveClick,
  onEditClick,
  onToggleFavourite,
}) => {
  const classNames = cx(className, 'characters-list-item');
  const favouriteButtonIcon = favourite ? 'glyphicon-star' : 'glyphicon-star-empty';

  return (
    <div className={classNames}>
      <div className="list-group-item-heading">
        <h4>{name}</h4>
        <div className="characters-list-item__buttons btn-group">
          <button
            type="button"
            disabled={pending}
            onClick={onEditClick}
            className="btn btn-sm btn-primary"
          >
            <span className="glyphicon glyphicon-edit" />
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={onRemoveClick}
            className="btn btn-sm btn-danger"
            >
              <span className="glyphicon glyphicon-trash" />
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={onToggleFavourite}
            className="btn btn-sm btn-info"
          >
            <span className={`glyphicon ${favouriteButtonIcon}`} />
          </button>
        </div>
      </div>
      <div className="list-group-item-text">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Height</th>
              <th>Mass</th>
              <th>Hair color</th>
              <th>Skin color</th>
              <th>Eye color</th>
              <th>Birth year</th>
              <th>Is male?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{height}</td>
              <td>{mass}</td>
              <td>{hair_color}</td>
              <td>{skin_color}</td>
              <td>{eye_color}</td>
              <td>{birth_year}</td>
              <td>{is_male ? 'Yes' : 'No'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

CharactersListItem.propTypes = {
  character: PropTypes.object,
  onRemoveClick: PropTypes.func,
  onEditClick: PropTypes.func,
  pending: PropTypes.bool,
  favourite: PropTypes.bool,
  onToggleFavourite: PropTypes.func,
  className: PropTypes.string,
};

export default CharactersListItem;
