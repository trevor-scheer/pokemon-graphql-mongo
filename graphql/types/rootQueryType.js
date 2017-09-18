const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require("graphql/type");

const pokemonType = require("./pokemonType");
const teamType = require("./teamType");

const Team = require("../../models/team");
const Pokemon = require("../../models/pokemon");

const rootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    pokemon: {
      type: pokemonType,
      args: {
        name: {
          name: "name",
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, { name }, source, fieldASTs) => {
        return Pokemon.model.findOne({ name });
      }
    },
    team: {
      type: teamType,
      args: {
        id: {
          name: "id",
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (root, { id }, source, fieldASTs) => {
        var foundTeam = new Promise((resolve, reject) => {
          Team.model.findById(id, (err, team) => {
            err ? reject(err) : resolve(team);
          });
        });

        return foundTeam;
      }
    },
    teams: {
      type: new GraphQLList(teamType),
      resolve: (root, {}, source, fieldASTs) => {
        var teams = new Promise((resolve, reject) => {
          Team.model
            .find({})
            .then(resolve)
            .catch(reject);
        });

        return teams;
      }
    }
  }
});

module.exports = rootQueryType;
