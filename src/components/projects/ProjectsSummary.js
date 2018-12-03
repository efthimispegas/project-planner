import React, { Component } from 'react';
import { connect } from 'react-redux';
import { capitalize } from 'lodash/string';
import moment from 'moment';

class ProjectsSummary extends Component {
  render() {
    const { project } = this.props;

    return (
      <div className="card z-depth-0 project-summary">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">{project.title}</span>
          <p>
            Posted by the user{' '}
            {capitalize(project.authorFirstname) +
              ' ' +
              capitalize(project.authorLastname)}{' '}
          </p>
          <p className="grey-text">
            {moment(project.createdAt.toDate()).calendar()}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authStatus: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(ProjectsSummary);
