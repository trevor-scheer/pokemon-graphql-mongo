const {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLList
} = require("graphql/type");

var pokemonInputType = new GraphQLInputObjectType({
  name: "pokemonInput",
  description: "A pokemon",
  fields: () => ({
    number: {
      type: GraphQLInt,
      description: "The pokemon's number."
    },
    name: {
      type: GraphQLString,
      description: "The name of the pokemon."
    },
    classification: {
      type: GraphQLString,
      description: "The classification of the pokemon."
    },
    types: {
      type: new GraphQLList(GraphQLString),
      description: "List of the pokemon's types."
    },
    resistances: {
      type: new GraphQLList(GraphQLString),
      description: "List of the pokemon's resistances."
    },
    weaknesses: {
      type: new GraphQLList(GraphQLString),
      description: "List of the pokemon's weaknesses."
    },
    maxHP: {
      type: GraphQLFloat,
      description: "The pokemon's max HP."
    },
    image: {
      type: GraphQLString,
      description: "URL of the pokemon's image."
    }
  })
});

module.exports = pokemonInputType;
