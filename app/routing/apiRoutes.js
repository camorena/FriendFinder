var fs = require("fs");
var path = require("path");

module.exports = function(app) {
  var filename = path.resolve(__dirname, "../data/friends.js");
  var obj = {
    table: []
  };
  friends = fs.readFileSync(filename, "utf8");

  // List all Friends
  app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });

  //add new friend
  app.post("/api/friends", function(req, res) {
    friends.push(JSON.stringify(req.body));
    fs.writeFile(filename, JSON.stringify(friends), "utf8", function(err) {
      if (err) {
        return res.status(500).end();
      }
      return res.status(200).end();
    });
  });
};
