const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} = require("graphql/type");

const pokemonType = require("./pokemonType");

var teamType = new GraphQLObjectType({
  name: "team",
  description: "A team of Pokemon",
  fields: () => ({
    id: {
      type: GraphQLID,
      description: "ID of the team"
    },
    name: {
      type: GraphQLString,
      description: "The name of the team."
    },
    image: {
      type: GraphQLString,
      description: "The URL of the image associated with the team."
    },
    pokemon: {
      type: new GraphQLList(pokemonType),
      description: "Pokemon belonging to the team"
    }
  })
});

module.exports = teamType;
