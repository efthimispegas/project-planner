import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

class NavigationBar extends Component {
  render() {
    const { authStatus, profile } = this.props;
    // console.log(authStatus);
    const links = authStatus.uid ? (
      <SignedInLinks profile={profile} />
    ) : (
      <SignedOutLinks />
    );
    return (
      <nav>
        <div className="nav-wrapper grey darken-3">
          <div className="container">
            <div className="brand-logo left">
              <Link to="/">ProjectPlan</Link>
            </div>
            {links}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    authStatus: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(NavigationBar);
