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

  //Function to reformat the timestamp into date format
  const formatDate = (newDate) => {
    //This splits string into substrings/array
    const splitDate = newDate.split('T');
    // console.log('new date object', splitDate);
    return splitDate[0];
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Plan Information</h1>
        </div>
      </div>
      <main>
        <div>
          {planInformation.map((planItem) => (
            <div key="planItem.id">
              <h2>{planItem.name}</h2>
              <p>Target Date: {formatDate(planItem.target_date)}</p>
              <p>Budget Goal: ${planItem.budget_goal}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default PlanInformationPage;
