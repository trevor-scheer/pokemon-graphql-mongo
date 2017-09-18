const { GraphQLSchema } = require("graphql/type");

const rootQueryType = require("./types/rootQueryType");
const rootMutationType = require("./types/rootMutationType");

var schema = new GraphQLSchema({
  query: rootQueryType,
  mutation: rootMutationType
});

module.exports = schema;
