module.exports = {
  "change-source": (state, payload) => {
    return {
      ...state,
      ...payload
    };
  }
};
