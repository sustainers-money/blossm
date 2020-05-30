module.exports = {
  initiate: (state, payload) => {
    return {
      ...state,
      appliedAmount: payload.amount,
      ...payload
    };
  },
  reverse: (state, payload) => {
    return {
      ...state,
      appliedAmount: state.appliedAmount - payload.reverseTransactions.reduce((r, v) => r + v.amount, 0),
      reverseTransactions: [
        ...(state.reverseTransactions || []),
        ...payload.reverseTransactions
      ]
        
    };
  }
};
