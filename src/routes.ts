import { dAppName } from 'config';
import withPageTitle from './components/PageTitle';
import CasinoProtocolHome from './pages';
import PreSale from './pages/Presale';
import Casinoswap from './pages/Casinoswap';
import DiceGame from './pages/DiceGame';
import Farms from './pages/Farms';
import Bridge from './pages/Bridge';
import Bettingverse from './pages/Bettingverse';

export const routeNames = {
  home: '/',
  unlock: '/unlock',
  presale: '/presale',
  farms: '/farms',
  casinoswap: '/casinoswap',
  dicegame: '/dice-game',
  bridge: '/bridge',
  bettingverse: '/bettingverse'
};

const routes: Array<any> = [

  {
    path: routeNames.home,
    title: 'Home',
    component: CasinoProtocolHome
  },

  {
    path: routeNames.farms,
    title: 'Farms',
    component: Farms
  },

  {
    path: routeNames.presale,
    title: 'PreSale',
    component: PreSale
  },
  { 
    path: routeNames.casinoswap,
    title: 'Casinoswap',
    component: Casinoswap
  },
  { 
    path: routeNames.dicegame,
    title: 'Dice Game',
    component: DiceGame
  },
  { 
    path: routeNames.bridge,
    title: 'Bridge',
    component: Bridge
  },
  { 
    path: routeNames.bettingverse,
    title: 'Bettingverse',
    component: Bettingverse
  }
];

const mappedRoutes = routes.map((route) => {
  const title = route.title
    ? `${route.title} • ${dAppName}`
    : `${dAppName}`;

  const requiresAuth = Boolean(route.authenticatedRoute);
  const wrappedComponent = withPageTitle(title, route.component);

  return {
    path: route.path,
    component: wrappedComponent,
    authenticatedRoute: requiresAuth
  };
});

export default mappedRoutes;
