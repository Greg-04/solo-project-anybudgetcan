import React, { Component } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <div>
            <LogOutButton className="btn" />
          </div>
          <div>
            <h1 className="header" style={{ marginBottom: '200px' }}>
              Something went wrong...
              <p>Please finish inputting required information!</p>
            </h1>
            <div style={{ marginBottom: '400px', textAlign: 'center' }}>
              <h3>Need Help?</h3>
              <button className="btn">
                <Link to="/info">How to Start</Link>
              </button>
            </div>
          </div>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
