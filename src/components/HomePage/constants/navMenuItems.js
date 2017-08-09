const NAV_MENU_ITEMS = [
  {
    title: 'Profile',
    children: [
      {
        title: 'Your progress',
        routeTo: '/profile/progress'
      },
      {
        title: 'Account',
        routeTo: '/profile/account'
      },
    ]
  },
  {
    title: 'Food',
    children: [
      {
        title: 'Daily food contoll',
        routeTo: '/food/controll/daily'
      },
    ]
  }
];

export default NAV_MENU_ITEMS;
