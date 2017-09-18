const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} = require("graphql/type");

const pokemonInputType = require("../inputTypes/pokemonInputType");

const teamInputType = new GraphQLInputObjectType({
  name: "teamInput",
  description: "A team",
  fields: () => ({
    name: {
      name: "name",
      type: new GraphQLNonNull(GraphQLString)
    },
    image: {
      name: "image",
      type: GraphQLString
    },
    pokemon: {
      name: "pokemon",
      type: new GraphQLList(pokemonInputType)
    }
  })
});

module.exports = teamInputType;
