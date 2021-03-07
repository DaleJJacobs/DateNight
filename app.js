const express = require("express");
const mongojs = require("mongojs");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

const databaseUrl = "datenightdb";
const collections = ["usernames"];

const db = mongojs(databaseUrl, collections);

db.on("error", (error) => {
  console.log("Database Error:", error);
});

// Compile the source code
// const compiledFunction = pug.compileFile("template.pug");

app.set("view engine", "pug");
app.set("views", "./views");
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/all", (req, res) => {
  console.log(db.usernames);
  db.usernames.find({}, (err, data) => {
    if (err) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
  // res.render(db);
});

app.post("/update", (req, res) => {
  console.log("this is update", req.body);
  db.usernames.insert(req.body, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});
app.delete("/delete/:id", (req, res) => {
  db.usernames.remove(
    {
      _id: mongojs.ObjectID(req.params.id),
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});
// Import routes and give the server access to them.
// var routes = require("./controllers/dogsController.js");

// app.use(routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, () =>
  // Log (server-side) when our server has started
  console.log(`Server listening on: http://localhost: + ${port}`)
);

// const express = require("express");
// const app = express();

// const port = 3000;
// const host = "localhost";

// app.set("views", "./views");
// app.set("view engine", "pug");

// app.get("/", (req, res) => {
//   res.render("index");
// });

// app.listen(port, host, () => {
//   console.log(`Server started at ${host} port ${port}`);
// });
