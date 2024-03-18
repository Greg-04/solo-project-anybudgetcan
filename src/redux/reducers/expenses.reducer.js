const expensesReducer = (state = [], action) => {
  switch (action.type) {
    // case 'ADD_EXPENSES_SUCCESS':
    //   return { ...state, error: true };
    case 'ADD_EXPENSES_ERROR':
      return { ...state, error: action.payload };
    //calling to worker saga
    case 'SET_EXPENSES':
      return action.payload;
    case 'DELETE_EXPENSE_SUCCESS':
      // Filter out the deleted expense from the state
      return state.filter((expense) => expense.id !== action.payload);
    case 'DELETE_EXPENSE_ERROR':
      return { ...state, error: action.payload };
    case 'UPDATE_EXPENSE_AMOUNT_SUCCESS':
      // Update the expense amount in the state
      return state.map((expense) =>
        expense.id === action.payload.id
          ? { ...expense, amount: action.payload.amount }
          : expense
      );
    case 'UPDATE_EXPENSE_AMOUNT_ERROR':
      // Handle errors if needed
      return state;
    default:
      return state;
  }
};

export default expensesReducer;
