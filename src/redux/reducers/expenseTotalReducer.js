const expenseTotalReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_EXPENSE_TOTAL':
      return action.payload;
    default:
      return state;
  }
};

export default expenseTotalReducer;