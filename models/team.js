var mongoose = require("mongoose");
var Pokemon = require("./pokemon");

var teamSchema = mongoose.Schema({
  name: String,
  image: String,
  pokemon: [Pokemon.schema]
});

var Team = mongoose.model("Team", teamSchema);

module.exports = { model: Team, schema: teamSchema };
