import * as MANAGE_TYPE from '../../../constants/manageTypes';

const NAV_MENU_ITEMS = [
  {
    title: 'Profile',
    children: [
      {
        title: 'Your Progress',
        routeTo: 'app/profile/progress',
      },
      {
        title: 'Account',
        routeTo: 'app/profile/account',
      },
    ],
  },
  {
    title: 'Training',
    children: [
      {
        title: 'Start training',
        routeTo: 'app/training',
      },
      {
        title: 'Training Plans',
        routeTo: 'app/training-plans',
      }
    ],
  },
  {
    title: 'Food',
    children: [
      {
        title: 'Daily Food Contoll',
        routeTo: 'app/food/controll/daily',
      },
      {
        title: 'Food Plans',
        routeTo: 'app/food/food-plans',
      },
    ],
  },
  {
    title: 'Manage',
    children: [
      {
        title: 'Users',
        routeTo: `app/manage/${MANAGE_TYPE.USERS}`,
      },
      {
        title: 'Food Plans',
        routeTo: `app/manage/${MANAGE_TYPE.FOOD_PLANS}`,
      },
      {
        title: 'Training Plans',
        routeTo: `app/manage/${MANAGE_TYPE.TRAINING_PLANS}`,
      },
      {
        title: 'Exercises',
        routeTo: `app/manage/${MANAGE_TYPE.EXERCISES}`,
      },
      {
        title: 'Muscles',
        routeTo: `app/manage/${MANAGE_TYPE.MUSCLES}`,
      },
    ]
  }
];

export default NAV_MENU_ITEMS;
