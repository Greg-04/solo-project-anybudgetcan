import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import './AboutPage.css';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <>
      <div>
        <LogOutButton className="btn" />
      </div>
      <div>
        <h1 className="header">About Page</h1>
      </div>
      <main className="container">
        <div>
          <p>
            "Any Budget Can" is an application that streamlines personal finance
            management by tracking income and expenses to tailor savings plans.
            Users will input their financial details, including income and fixed
            expenses, and set limits on predefined category expenses. They can
            then manually add transactions to track and monitor their budget.
            The application will provide a comprehensive overview of a
            personalized savings plan with pages for:
          </p>
          <ul>
            <li>Transaction history</li>
            <li>Categorized budget overview</li>
            <li>Plan information</li>
            <li>Remaining budget amount</li>
          </ul>
          <p>
            Users will also be able to access each of these pages to view,
            modify, or add additional savings plans. Allowing users to
            understand their financial habits and progress toward savings goals
            effectively.
          </p>
        </div>
      </main>
      <div>
        <p className="footer">
          Thanks to Prime Digital Academy who equipped and helped me to make
          this application a reality!
        </p>
      </div>
    </>
  );
}

export default AboutPage;
