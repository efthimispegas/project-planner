import React, { Component } from 'react';
import Notifications from './Notifications';
import ProjectsList from '../projects/ProjectsList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
  state = {
    projects: null
  };
  render() {
    const { projects, authStatus, notifications } = this.props;

    if (!authStatus.uid) {
      return <Redirect to="/signin" />;
    }

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <div className="card">
              <ProjectsList projects={projects} />
            </div>
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications notifications={notifications} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    projects: state.firestore.ordered.Projects,
    notifications: state.firestore.ordered.Notifications,
    authStatus: state.firebase.auth
  };
};

//Use: Whenever the Dashboard component is active, it listens to the Firestore
// Database collection with name 'Projects' or 'Notifications'
// (through firestoreConnect) and when there is a change in the store's state,
// it syncs this component's props (thanks to mapStateToProps)

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'Projects', orderBy: ['createdAt', 'desc'] },
    { collection: 'Notifications', limit: 5, orderBy: ['time', 'desc'] }
  ])
)(Dashboard);
