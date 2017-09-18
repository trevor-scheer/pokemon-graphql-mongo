const express = require("express");
const app = express();
const mongoose = require("mongoose");
const graphqlHTTP = require("express-graphql");
const schema = require("./graphql/schema");
var cors = require("cors");

app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://testUser:password@ds139994.mlab.com:39994/pokemon-mongo",
  { useMongoClient: true }
);
var db = mongoose.connection;
db.on("error", function() {
  console.log("---FAILED to connect to mongoose");
});
db.once("open", function() {
  console.log("+++Connected to mongoose");
});

app.use(
  "/graphql",
  graphqlHTTP(req => ({
    schema,
    graphiql: true
  }))
);

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
