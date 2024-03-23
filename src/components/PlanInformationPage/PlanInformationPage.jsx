import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PlanInformationPage.css';

function PlanInformationPage() {
  //Set Dispatch Hook
  const dispatch = useDispatch();
  //Set state for plan data
  const planInformation = useSelector((store) => store.plan);

  // Fetch categories on component mount
  useEffect(() => {
    dispatch({ type: 'FETCH_PLAN' });
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Plan Information</h1>
        </div>
      </div>
      <main>
        <div></div>
      </main>
    </>
  );
}

export default PlanInformationPage;
