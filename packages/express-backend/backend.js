import express from "express";


const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

//instance of express
const app = express();
//port
const port = 8000;

//process incoming data in json
app.use(express.json());

//api endpoint
// get request
// if match pattern '/', hello world prints
app.get("/", (req, res) => {
  res.send("Hello World!");
});


//backend server listening on our port
app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

// get users by name
const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };
  
  app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
      let result = findUserByName(name);
      result = { users_list: result };
      res.send(result);
    } else {
      res.send(users);
    }
  });