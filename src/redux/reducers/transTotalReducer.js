const transTotalReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TRANSACTION_TOTAL':
      return action.payload;
    default:
      return state;
  }
};

export default transTotalReducer;