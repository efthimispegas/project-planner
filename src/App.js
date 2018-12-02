import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';

import NavigationBar from './components/layout/NavigationBar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetails from './components/projects/ProjectDetails';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import CreateProject from './components/projects/CreateProject';
import './index.css';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { loadState, saveState } from './localStorage';

import fbConfig from './config/fbConfig';

const persistedState = loadState();

const createStoreWithFirebase = compose(
  applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
  reactReduxFirebase(fbConfig, {
    useFirestoreForProfile: true,
    userProfile: 'Users',
    attachAuthIsReady: true
  }),
  reduxFirestore(fbConfig)
)(createStore);

export const store = createStoreWithFirebase(
  rootReducer,
  // persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  saveState({
    project: store.getState().project
  });
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavigationBar />
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/project/:id" component={ProjectDetails} />
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />
              <Route path="/create" component={CreateProject} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
