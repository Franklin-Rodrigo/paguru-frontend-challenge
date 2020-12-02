import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useAuth } from '../contexts/auth';

import Login from '../pages/Login';
import Register from '../pages/Register'

const AuthRoutes: React.FC = () => {
  const { signed } = useAuth();

  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={Register} />
      <Route
        path="*"
        component={
          signed
            ? () => <Redirect to="/dashboard" />
            : () => <Redirect to="/" />
        }
      />
    </Switch>
  );
};

export default AuthRoutes;
