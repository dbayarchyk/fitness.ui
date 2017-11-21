import React from 'react';
import PropTypes from 'prop-types';

import * as MUSCLE_GROUP from '../../constants/muscleGroups';

import Toolbar from '../common/Toolbar/Toolbar';
import {
  CharacteristicField,
  CharacteristicKey,
  CharacteristicValue,
} from '../common/CharacteristicField/CharacteristicField';
import EditableField from '../common/EditableField/EditableField';

import './MuscleBuilder.css';

const GROUPS = [
  MUSCLE_GROUP.BACK,
  MUSCLE_GROUP.BICEPS,
  MUSCLE_GROUP.LEGS,
  MUSCLE_GROUP.PECTORALIS,
  MUSCLE_GROUP.TRICEPS,
];

const MuscleBuilder = ({ name, group, toolbarActions, onFieldChange }) => (
  <section className="muscle-builder">
    <Toolbar
      title="Muscle builder"
      actions={toolbarActions}
    />

    <section className="muscle-builder__data">
      <CharacteristicField>
        <CharacteristicKey>
          Name
        </CharacteristicKey>

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
        <CharacteristicKey>
          Group
        </CharacteristicKey>

        <CharacteristicValue>
          <EditableField
            input={{
              type: "select",
              value: group,
              placeholder: "Group",
              name: "group",
              children: GROUPS.map((group, index) => <option value={group.type} key={index}>{group.title}</option>)
            }}
            onSubmit={onFieldChange}
          >
            {group && MUSCLE_GROUP[group].title}
          </EditableField>
        </CharacteristicValue>
      </CharacteristicField>
    </section>
  </section>
);

MuscleBuilder.propTypes = {
  name: PropTypes.string,
  group: PropTypes.string,
  toolbarActions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.node,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
  })),
  onFieldChange: PropTypes.func,
};

MuscleBuilder.defaultProps = {
  name: '',
  group: '',
  toolbarActions: [],
  onFieldChange: () => {},
};

export default MuscleBuilder;
