import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class SignedOutLinks extends Component {
    render() {
        return (
            <ul className="right">
                <li><NavLink to="/signup">Sign Up</NavLink></li>
                <li><NavLink to="/signin">Login</NavLink></li>
            </ul>
        );
    }
}

export default SignedOutLinks;