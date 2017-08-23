const NAV_MENU_ITEMS = [
  {
    title: 'Profile',
    children: [
      {
        title: 'Your progress',
        routeTo: 'app/profile/progress'
      },
      {
        title: 'Account',
        routeTo: 'app/profile/account'
      },
    ]
  },
  {
    title: 'Food',
    children: [
      {
        title: 'Daily food contoll',
        routeTo: 'app/food/controll/daily'
      },
    ]
  }
];

export default NAV_MENU_ITEMS;
