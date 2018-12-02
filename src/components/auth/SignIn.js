import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signIn } from '../../actions/authActions';

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
    return <Redirect to="/" />;
  };

  render() {
    const { authError, authStatus } = this.props;

    if (authStatus.uid) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <h5 className="grey-text text-darken-3 center">Sign In</h5>
        <form className="col s6 m6" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s6 offset-m3">
              <i className="material-icons prefix">account_circle</i>
              <input
                className="validate"
                id="email"
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6 offset-m3">
              <i className="material-icons prefix">edit</i>
              <input
                className="validate"
                id="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6 offset-m5">
              <button className="btn pink lighten-1 z-depth-0">Login</button>
            </div>
          </div>
        </form>

        <div className="red-text center">
          {authError ? <p>*{authError.message}</p> : null}
        </div>

        <div className="center">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link> instead.
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    authError: state.auth.authError,
    authStatus: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: credentials => dispatch(signIn(credentials))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
