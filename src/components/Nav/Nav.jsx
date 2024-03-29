import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/homeDashboard">
        <h2 className="nav-title">Any Budget Can</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/homeDashboard">
              Home
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <Link className="navLink" to="/addTransactions">
              Add Transactions
            </Link>

            <Link className="navLink" to="/viewTransactions">
              View Transactions
            </Link>

            <Link className="navLink" to="/expensesPage">
              Expenses
            </Link>

            <Link className="navLink" to="/incomePage">
              Income
            </Link>

            <Link className="navLink" to="/createPlanPage">
              Create Plan
            </Link>

            <Link className="navLink" to="/budgetOverviewPage">
              Budget Overview
            </Link>

            <Link className="navLink" to="/planInformationPage">
              Plan Information
            </Link>
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
