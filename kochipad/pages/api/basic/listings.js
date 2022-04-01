const state = require('/pages/api/state.js');

// next js api function
const getListingList = async () => {
  return await state.functions.getListingList();
};

module.exports = { getListingList };
