import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../actions/authActions';
import { Redirect } from 'react-router-dom';

class SignUp extends Component {
  state = {
    firstname: '',
    lastname: '',
    username: '',
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
    this.props.signUp(this.state);
  };

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      'beforeunload',
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      'beforeunload',
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
      console.log(`key: ${key}, value: ${this.state[key]}`);
    }
  }

  render() {
    const { authError, authStatus } = this.props;
    if (authStatus.uid) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <h5 className="grey-text text-darken-3 center">Sign Up</h5>
        <form className="col s6 m6" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s5 offset-m4">
              <input
                className="validate"
                id="firstname"
                type="text"
                onChange={this.handleChange}
              />
              <label htmlFor="firstname">First Name</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s5 offset-m4">
              <input
                className="validate"
                id="lastname"
                type="text"
                onChange={this.handleChange}
              />
              <label htmlFor="lastname">Last Name</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6 offset-m3">
              <i className="material-icons prefix">account_circle</i>
              <input
                className="validate"
                id="username"
                type="text"
                onChange={this.handleChange}
              />
              <label htmlFor="username">Username</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6 offset-m3">
              <i className="material-icons prefix">email</i>
              <input
                className="validate"
                id="email"
                type="email"
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
                onChange={this.handleChange}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6 offset-m5">
              <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
            </div>
          </div>

          <div className="red-text center">
            {authError ? <p>*{authError.message}</p> : null}
          </div>

          <div className="center">
            <p>
              Already have an account? <Link to="/signin">Sign in</Link>{' '}
              instead.
            </p>
          </div>
        </form>
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
    signUp: newUser => dispatch(signUp(newUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
