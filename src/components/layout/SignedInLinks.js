import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../actions/authActions';

class SignedInLinks extends Component {
  handleClick = () => {
    this.props.signOut();
  };

  render() {
    return (
      <ul className="right">
        <li>
          <NavLink to="/create">New Project</NavLink>
        </li>
        <li>
          <NavLink to="/" onClick={this.handleClick}>
            Log Out
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <div className="btn btn-floating pink lighten-1">TP</div>
          </NavLink>
        </li>
      </ul>
    );
  }
}

const mapDispatchToPros = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  null,
  mapDispatchToPros
)(SignedInLinks);
