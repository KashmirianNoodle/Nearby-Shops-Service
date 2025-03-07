const { fetchPlaces } = require("../controllers/search");

const resolvers = {
  Query: {
    searchPizza: (_, { location }) => fetchPlaces("pizza", location),
    searchJuice: (_, { location }) => fetchPlaces("juice", location),
    searchCombo: async (_, { location }) => {
      const [pizza, juice] = await Promise.all([fetchPlaces("pizza", location), fetchPlaces("juice", location)]);
      return [...pizza, ...juice];
    },
  },
};

module.exports = { resolvers };
