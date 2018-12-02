import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ProjectsSummary from './ProjectsSummary';

class ProjectsList extends Component {
  render() {
    // console.log(this.props);
    const { projects } = this.props;

    return (
      <div className="projects-list section">
        {projects &&
          projects.map(project => {
            return (
              <div key={project.id} className="card">
                <Link to={`/project/${project.id}`} key={project.id}>
                  <ProjectsSummary project={project} />
                </Link>
              </div>
            );
          })}
      </div>
    );
  }
}

export default ProjectsList;
