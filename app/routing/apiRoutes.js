var fs = require("fs");
var path = require("path");

module.exports = function(app) {
  var filename = path.resolve(__dirname, "../data/friends.js");

  // List all Friends
  app.get("/api/friends", function(req, res) {
    fs.readFile(filename, "utf-8", function(err, data) {
      if (err) throw err;
      return res.json(JSON.parse(data));
    });
  });

  //add new friend
  app.post("/api/friends", function(req, res) {
    fs.readFile(filename, "utf-8", function(err, data) {
      if (err) throw err;
      var objFriends = JSON.parse(data);
      objFriends.friends.push(req.body);
      fs.writeFile(filename, JSON.stringify(objFriends), "utf-8", function(
        err
      ) {
        if (err) throw err;
        match = Math.floor(Math.random() * objFriends.friends.length);
        return res.json({
          name: objFriends.friends[match].name,
          photo: objFriends.friends[match].photo
        });
      });
    });
  });
};
