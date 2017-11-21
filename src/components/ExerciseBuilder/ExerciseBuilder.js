import React from 'react';
import PropTypes from 'prop-types';

import Toolbar from '../common/Toolbar/Toolbar';
import {
  CharacteristicField,
  CharacteristicKey,
  CharacteristicValue,
} from '../common/CharacteristicField/CharacteristicField';
import EditableField from '../common/EditableField/EditableField';

import './ExerciseBuilder.css';

const ExerciseBuilder = ({
  name,
  avatarUrl,
  photos,
  muscules,
  description,
  video,
  toolbarActions,
}) => (
  <section className="exercise-builder">
    <Toolbar
      title="Exercise builder"
      actions={toolbarActions}
    />

    <section className="exercise-builder__data">
      <CharacteristicField>
        <CharacteristicKey>Name</CharacteristicKey>

        <CharacteristicValue>
          <EditableField
            input={{
              value: name,
              placeholder: "Name",
              name: "name",
            }}
          >
            {name}
          </EditableField>
        </CharacteristicValue>
      </CharacteristicField>
    </section>
  </section>
);

ExerciseBuilder.propTypes = {
  name: PropTypes.string,
  avatarUrl: PropTypes.string,
  photos: PropTypes.arrayOf(
    PropTypes.string,
  ),
  muscules: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string,
    }),
  ),
  description: PropTypes.string,
  video: PropTypes.string,
  toolbarActions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.node,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
  })),
};

ExerciseBuilder.defaultProps = {
  name: '',
  avatarUrl: '',
  photos: [],
  muscules: [],
  description: '',
  video: '',
  toolbarActions: [],
};

export default ExerciseBuilder;