const transactionReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TRANSACTION_SUCCESS':
      return { ...state, success: true };
    case 'ADD_TRANSACTION_ERROR':
      return { ...state, error: action.payload };
      //calling to worker saga
    case 'SET_TRANSACTIONS':
      return action.payload;
    case 'DELETE_TRANSACTION_SUCCESS':
      // Filter out the deleted transaction from the state
      return state.filter((transaction) => transaction.id !== action.payload);
    case 'DELETE_TRANSACTION_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default transactionReducer;
