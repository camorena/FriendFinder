var path = require("path");

module.exports = function(app) {
  // Basic route that sends the user home page
  app.get("/", function(req, res) {
    //res.send("Welcome to the Friends Page 1! ");
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  // Route that sends the user to survey page
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

  // If no matching route is found default to home
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  // add new friend to friends.js file
  app.post("/survey", function(req, res) {
    var newFriend = req.body;
    fs.appendFile("friends.js", newFriend, function(err) {
      if (err) {
        return res.status(500).end();
      }
      fs.readFile("friends.js", "utf8", function(error, data) {
        if (error) {
          return res.status(500).end();
        }
        var friends = JSON.stringify(data);
        console.log(friends);
      });
    });
  });
};
