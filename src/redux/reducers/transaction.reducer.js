const transactionReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TRANSACTION_SUCCESS':
      return { ...state, success: true };
    case 'ADD_TRANSACTION_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default transactionReducer;
