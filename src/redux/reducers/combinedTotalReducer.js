const combinedTotalReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_COMBINED_TOTAL':
      return action.payload;
    default:
      return state;
  }
};

export default combinedTotalReducer;