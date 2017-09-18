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
const pokemonInputType = require("../inputTypes/pokemonInputType");
const teamType = require("./teamType");
const teamInputType = require("../inputTypes/teamInputType");

const Pokemon = require("../../models/pokemon");
const Team = require("../../models/team");

const rootMutationType = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    createTeam: {
      type: teamType,
      args: {
        input: {
          name: "input",
          type: teamInputType
        }
      },
      resolve: (root, { input: { name, image } }, source, fieldASTs) => {
        return new Promise((resolve, reject) => {
          const newTeam = new Team.model({ name, image });
          newTeam
            .save()
            .then(resolve)
            .catch(reject);
        });
      }
    },
    deleteTeam: {
      type: teamType,
      args: {
        id: {
          name: "id",
          type: GraphQLID
        }
      },
      resolve: (root, { id }, source, fieldASTs) => {
        return new Promise((resolve, reject) => {
          Team.model
            .findByIdAndRemove(id)
            .then(resolve)
            .catch(reject);
        });
      }
    },
    addPokemonToTeam: {
      type: teamType,
      args: {
        pokemonId: {
          name: "pokemonId",
          type: GraphQLID
        },
        pokemonName: {
          name: "pokemonName",
          type: GraphQLString
        },
        teamId: {
          name: "teamId",
          type: GraphQLID
        }
      },
      resolve: (
        root,
        { pokemonId, pokemonName, teamId },
        source,
        fieldASTs
      ) => {
        return new Promise((resolve, reject) => {
          const queryObj = pokemonId
            ? { id: pokemonId }
            : { name: pokemonName };

          Team.model
            .findById(teamId)
            .then(team => {
              const pokemon = Pokemon.model.findOne(queryObj).then(pokemon => {
                // Force creation of a new ID on save so a Pokemon is uniquely identifiable within a team
                pokemon._id = undefined;
                team.pokemon.push(pokemon);
                team.save().then(resolve);
              });
            })
            .catch(reject);
        });
      }
    },
    removePokemonFromTeam: {
      type: teamType,
      args: {
        pokemonId: {
          name: "pokemonId",
          type: GraphQLID
        },
        teamId: {
          name: "teamId",
          type: GraphQLID
        }
      },
      resolve: (root, { pokemonId, teamId }, source, fieldASTs) => {
        return new Promise((resolve, reject) => {
          Team.model
            .findById(teamId)
            .then(team => {
              team.pokemon.id(pokemonId).remove();
              team.save().then(resolve);
            })
            .catch(reject);
        });
      }
    }
  }
});

module.exports = rootMutationType;
