import React, { Component } from 'react';
import moment from 'moment';

class Notifications extends Component {
  render() {
    const { notifications } = this.props;
    return (
      <div className="section">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">Notifications</span>
            <ul className="notifications">
              {notifications &&
                notifications.map(key => {
                  return (
                    <li key={key.id}>
                      <span className="pink-text">{key.user}</span>{' '}
                      <span>{key.content}</span>
                      <div className="grey-text note-date">
                        {moment(key.time.toDate()).fromNow()}
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Notifications;
