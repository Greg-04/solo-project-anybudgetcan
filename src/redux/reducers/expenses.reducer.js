const expensesReducer = (state = null, action) => {
  switch (action.type) {
    case 'ADD_EXPENSES_SUCCESS':
      return { ...state, success: true };
    case 'ADD_EXPENSES_ERROR':
      return { ...state, error: action.payload };
    //calling to worker saga
    case 'SET_EXPENSES':
      return action.payload;
    default:
      return state;
  }
};

export default expensesReducer;
