import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { capitalize } from 'lodash/string';
import moment from 'moment';

class ProjectDetails extends Component {
  render() {
    const {
      title,
      content,
      authorFirstname,
      authorLastname,
      createdAt
    } = this.props.project;

    const { authStatus } = this.props;
    if (!authStatus.uid) {
      return <Redirect to="/signin" />;
    }

    console.log(this.props);

    if (this.props.project) {
      return (
        <div className="container section project-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="card-title">
                <h4>{title}</h4>
              </span>
              <p>{content}</p>
            </div>
            <div className="card-action gret lighten-4 grey-text">
              <div>
                Posted by the user{' '}
                {capitalize(authorFirstname) + ' ' + capitalize(authorLastname)}
              </div>
              <div>{moment(createdAt.toDate()).calendar()}</div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container center">
          <p>Loading project details...</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const project = state.firestore.data.Projects
    ? state.firestore.data.Projects[id]
    : null;

  return {
    project,
    authStatus: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'Projects' }])
)(ProjectDetails);
