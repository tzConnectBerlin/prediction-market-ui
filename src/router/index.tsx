import * as React from 'react';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { routes } from './routes';
import { ComponentRoute } from '../interfaces';

const HomePage = React.lazy(() => import('../pages/HomePage/HomePage'));

const RouteWithSubRoutes = (route: ComponentRoute) => {
  const { path } = route;
  return (
    <Route
      path={path}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render={(props: any) => <route.component {...props} routes={route?.routes} />}
      exact
    />
  );
};

const AppRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Switch location={location} key={location.pathname}>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </AnimatePresence>
  );
};

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="*">
          <AppRoutes />
        </Route>
      </Switch>
    </Router>
  );
};
