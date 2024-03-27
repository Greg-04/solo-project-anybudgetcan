const incomeRemainingReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_INCOME_REMAINING':
      return action.payload;
    default:
      return state;
  }
};

export default incomeRemainingReducer;
