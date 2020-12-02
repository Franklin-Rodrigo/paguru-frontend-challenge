import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useAuth } from '../contexts/auth';

import Dashboard from '../pages/Dashboard';
import NewPost from '../pages/NewPost';
import ListUsers from '../pages/ListUsers';
import DetailsUser from '../pages/DetailsUser';
import EditPost from '../pages/EditPost';
const AppRoutes: React.FC = () => {
  const { signed } = useAuth();

  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/newpost" component={NewPost}/>
      <Route path="/listusers" component={ListUsers}/>
      <Route path="/details/:id" component= {DetailsUser}/>
      <Route path="/editpost/:id" component={EditPost}/>
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

export default AppRoutes;
