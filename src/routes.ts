import { dAppName } from 'config';
import withPageTitle from './components/PageTitle';
import Staking from './pages';
import Dashboard from './pages/Dashboard';

export const routeNames = {
  staking: '/',
  unlock: '/unlock',
  dashboard: '/casinoswap',
};

const routes: Array<any> = [

  {
    path: routeNames.staking,
    title: 'Staking',
    component: Staking
  },
  { 
    path: routeNames.dashboard,
    title: 'Dashboard',
    component: Dashboard
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
