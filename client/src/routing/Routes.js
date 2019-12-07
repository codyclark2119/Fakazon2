import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
// import Alert from '../layout/Alert';
// import Dashboard from '../dashboard/Dashboard';
import NotFound from '../pages/NoMatch';
// import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {
  return (
    <section className='container'>
      {/* <Alert /> */}
      <Switch>
        <Route exact path='/Signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        {/* <PrivateRoute exact path='/dashboard' component={Dashboard} /> */}
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
