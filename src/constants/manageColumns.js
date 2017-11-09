import * as TYPE from './manageTypes';

export default {
  [TYPE.USERS]: [
    {
      name: 'email',
      title: 'Email',
    },
    {
      name: 'purpose',
      title: 'Purpose',
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
    },
  ],
  [TYPE.TRAINING_PLANS]: [
    {
      name: 'name',
      title: 'Name',
    },
  ]
};
