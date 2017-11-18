import React from 'react';
import { Badge } from 'reactstrap';

import * as TYPE from './manageTypes';
import * as MUSCLE_GROUP from './muscleGroups';
import * as TRAINING_PURPOSE from './trainingPurposes';

export default {
  [TYPE.USERS]: [
    {
      name: 'email',
      title: 'Email',
    },
    {
      name: 'purpose',
      title: 'Purpose',
      renderItemValue(purpose) {
        return TRAINING_PURPOSE[purpose].title;
      }
    },
    {
      name: 'age',
      title: 'Age',
      class: 'table__column--center',
    },
    {
      name: 'name',
      title: 'Name',
    },
    {
      name: 'surname',
      title: 'Surname',
    },
  ],
  [TYPE.FOOD_PLANS]: [
    {
      name: 'name',
      title: 'Name',
    },
    {
      name: 'calorificValue',
      title: 'Calorific Value',
      class: 'table__column--center',
      renderItemValue(value) {
        return `${value} kcal`;
      },
    },
  ],
  [TYPE.TRAINING_PLANS]: [
    {
      name: 'name',
      title: 'Name',
    },
  ],
  [TYPE.MUSCLES]: [
    {
      name: 'name',
      title: 'Name',
    },
    {
      name: 'group',
      title: 'Group',
      class: 'table__column--center',
      renderItemValue(value) {
        return MUSCLE_GROUP[value].title;
      },
    },
  ],
  [TYPE.EXERCISES]: [
    {
      name: 'name',
      title: 'Name',
    },
    {
      name: 'muscules',
      title: 'Muscules',
      class: 'table__column--center',
      renderItemValue(muscules) {
        return muscules.map(muscule => <Badge color="primary" key={muscule.name}>{muscule.name}</Badge>);
      },
    },
  ],
};
