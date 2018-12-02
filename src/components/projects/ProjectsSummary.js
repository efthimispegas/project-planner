import React, {Component} from 'react';

class ProjectsSummary extends Component {
    render() {
        const {project} = this.props;
        return (
            <div className="card z-depth-0 project-summary">
                    <div className="card-content grey-text text-darken-3">
                        <span className="card-title">{project.title}</span>
                        <p>Posted by the Tim Pegas</p>
                        <p className="grey-text">24th November, 6pm</p>
                    </div>
            </div>
        );
    }
}

export default ProjectsSummary;