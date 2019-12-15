import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './routing/Routes';
import Home from './pages/Home';
import Navbar from './components/Navbar';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <div className='App'>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route component={Routes} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
