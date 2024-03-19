const incomeReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_INCOME':
      return action.payload;
    default:
      return state;
  }
};

export default incomeReducer;