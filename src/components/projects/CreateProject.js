import React, { Component } from 'react';
import { createProject } from '../../actions/projectActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class CreateProject extends Component {
  state = {
    title: '',
    content: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.createProject(this.state);
  };
  render() {
    const { authStatus } = this.props;
    if (!authStatus.uid) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container">
        <h5 className="grey-text text-darken-3 center">Create a new Project</h5>
        <form className="col s6 m6" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s6 offset-m3">
              <input
                id="title"
                type="text"
                value={this.state.title}
                onChange={this.handleChange}
              />
              <label htmlFor="title">Title</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6 offset-m3">
              <textarea
                className="materialize-textarea"
                id="content"
                value={this.state.content}
                onChange={this.handleChange}
              />
              <label htmlFor="content">Project Content</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6 offset-m5">
              <button className="btn pink lighten-1 z-depth-0">Create</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authStatus: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProject: project => dispatch(createProject(project))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProject);
