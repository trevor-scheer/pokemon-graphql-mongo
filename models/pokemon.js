var mongoose = require("mongoose");

var pokemonSchema = mongoose.Schema({
  name: String,
  number: Number,
  classification: String,
  types: [{ type: String }],
  resistances: [{ type: String }],
  weaknesses: [{ type: String }],
  fleeRate: Number,
  maxHP: Number,
  image: String
});

var Pokemon = mongoose.model("Pokemon", pokemonSchema);

module.exports = { model: Pokemon, schema: pokemonSchema };
