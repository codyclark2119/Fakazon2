import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
// import Checkout from '../pages/Checkout';
import NotFound from '../pages/NoMatch';
// import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {
  return (
    <Container>
      <Switch>
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        {/* <PrivateRoute exact path='/checkout' component={Checkout} /> */}
        <Route component={NotFound} />
      </Switch>
    </Container>
  );
};

export default Routes;
