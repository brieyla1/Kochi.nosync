/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Home', // name that appear in Sidebar
  },
  {
    icon: 'ChartsIcon',
    name: 'Presales',
    routes: [
      {
        path: '/presale/new',
        name: 'Launch presale',
      },
      {
        path: '/presale',
        name: 'Browse Presales',
      },
    ],
  },
  {
    icon: 'CardsIcon',
    name: 'Airdrops',
    routes: [
      {
        path: '/app/airdrop/new',
        name: 'Create Airdrop',
      },
    ],
  },
  {
    path: '/staking',
    icon: 'ModalsIcon',
    name: 'Staking',
  },
  {
    path: '#',
    icon: 'TablesIcon',
    name: 'Documentation',
  },
];

export default routes;
