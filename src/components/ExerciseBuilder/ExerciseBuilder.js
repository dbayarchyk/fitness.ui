import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Button } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import Toolbar from '../common/Toolbar/Toolbar';
import {
  CharacteristicField,
  CharacteristicKey,
  CharacteristicValue,
} from '../common/CharacteristicField/CharacteristicField';
import EditableField from '../common/EditableField/EditableField';
import AddItem from '../common/AddItem/AddItem';

import MuscleAutoComplete from '../../containers/MuscleAutoComplete';

import './ExerciseBuilder.css';

const ExerciseBuilder = ({
  name,
  avatarUrl,
  photos,
  muscules,
  description,
  video,
  complexity,
  toolbarActions,
  onFieldChange,
  addMuscleRef,
  onRemoveMuscle,
  onAddNewMuscle,
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
            onSubmit={onFieldChange}
          >
            {name}
          </EditableField>
        </CharacteristicValue>
      </CharacteristicField>

      <CharacteristicField>
        <CharacteristicKey>Avatar Url</CharacteristicKey>

        <CharacteristicValue>
          <EditableField
            input={{
              value: avatarUrl,
              placeholder: "Avatar Url",
              name: "avatarUrl",
            }}
            onSubmit={onFieldChange}
          >
            <img className="exercise__data__avatar" src={avatarUrl} />
          </EditableField>
        </CharacteristicValue>
      </CharacteristicField>

      <CharacteristicField>
        <CharacteristicKey>Muscules</CharacteristicKey>

        <CharacteristicValue>
          {
            muscules.map(muscule => (
              <Badge color="primary" key={muscule.name} className="exercise-builder__muscle">
                {muscule.name}

                <Button
                  color="link"
                  className="exercise-builder__remove-muscle-button"
                  onClick={() => onRemoveMuscle(muscule._id)}
                >
                  <FontAwesome name="times" />
                </Button>
              </Badge>
            ))
          }

          <AddItem
            ref={addMuscleRef}
            input={(
              <MuscleAutoComplete
                onChange={onAddNewMuscle}
                filterBy={newMuscle => !muscules.find(muscle => muscle._id === newMuscle._id)}
              />
            )}
          />
        </CharacteristicValue>
      </CharacteristicField>

      <CharacteristicField>
        <CharacteristicKey>Description</CharacteristicKey>

        <CharacteristicValue>
          <EditableField
            input={{
              type: 'textarea',
              value: description,
              placeholder: "Description",
              name: "description",
            }}
            onSubmit={onFieldChange}
          >
            {description}
          </EditableField>
        </CharacteristicValue>
      </CharacteristicField>

      <CharacteristicField>
        <CharacteristicKey>Complexity</CharacteristicKey>

        <CharacteristicValue>
          <EditableField
            input={{
              type: 'number',
              value: complexity,
              placeholder: "Complexity",
              name: "complexity",
            }}
            onSubmit={onFieldChange}
          >
            {complexity}
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
  complexity: PropTypes.number,
  toolbarActions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.node,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
  })),
  onFieldChange: PropTypes.func.isRequired,
  addMuscleRef: PropTypes.func,
  onRemoveMuscle: PropTypes.func.isRequired,
  onAddNewMuscle: PropTypes.func.isRequired,
};

ExerciseBuilder.defaultProps = {
  name: '',
  avatarUrl: '',
  photos: [],
  muscules: [],
  description: '',
  video: '',
  complexity: 0,
  toolbarActions: [],
  onFieldChange: () => {},
  addMuscleRef: () => {},
};

export default ExerciseBuilder;