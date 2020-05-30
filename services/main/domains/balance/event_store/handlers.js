module.exports = {
  initialize: (state, payload) => {
    return {
      ...payload,
      amount: 0
    };
  },
  add: (state, payload) => {
    return {
      ...state,
      amount: (state.amount || 0) + payload.amount
    };
  },
  subtract: (state, payload) => {
    return {
      ...state,
      amount: (state.amount || 0) - payload.amount
    };
  }
};
