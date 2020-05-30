module.exports = {
  initialize: (state, payload) => {
    return {
      ...state,
      ...payload
    };
  }
};
