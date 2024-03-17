const transactionReducer = (state = null, action) => {
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
    case 'UPDATE_TRANSACTION_AMOUNT_SUCCESS':
      // Update the transaction amount in the state
      return state.map((transaction) =>
        transaction.id === action.payload.id
          ? { ...transaction, amount: action.payload.amount }
          : transaction
      );
    case 'UPDATE_TRANSACTION_AMOUNT_ERROR':
      // Handle errors if needed
      return state;
    default:
      return state;
  }
};

export default transactionReducer;
