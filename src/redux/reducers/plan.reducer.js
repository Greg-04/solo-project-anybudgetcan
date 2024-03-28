const planReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_PLAN':
      return action.payload;
    case 'DELETE_PLAN_SUCCESS':
      // Filter out the deleted plan from the state
      return state.filter((plan) => plan.id !== action.payload);
    case 'DELETE_PLAN_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default planReducer;
