const incomeReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_INCOME':
      return action.payload;
    case 'UPDATE_INCOME_AMOUNT_SUCCESS':
      // if id matches update state with payload
      return state.map((income) =>
        income.id === action.payload.id
          ? { ...income, monthly_amount: action.payload.monthly_amount }
          : income
      );
    case 'UPDATE_INCOME_AMOUNT_ERROR':
      // Handle errors if needed
      return state;
    default:
      return state;
  }
};

export default incomeReducer;
