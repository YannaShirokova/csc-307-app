import express from "express";
import cors from "cors";

import userServices from "./user-services.js"; 

//instance of express
const app = express();
//port
const port = 8000;

// enable all CORS requests
app.use(cors());

//process incoming data in json
app.use(express.json());

// GET REUQUESTS ----------------------------------------------

//api endpoint
// get request
// if match pattern '/', hello world prints
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// get users based on what is provided (name, job)
// use function in user-services

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userServices.getUsers(name, job)
    .then((result) => {
      res.send({ users_list: result });
    })
    .catch((error) => {
      res.status(500).send("not found"); // 500? 
    });
});

// find user by id (get request)
app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  userServices.findUserById(id)
    .then((result) => {
      if (!result) {
        res.status(404).send();
      } else {
        res.send(result);
      }
    })
    .catch((error) => {
      res.status(500).send("not found");
    });
});

// POST REQUEST ----------------------------------------------------

// generate random id 
const gen_id = () => {
  const min = 1;
  const max = 1000; 

  const gen = Math.floor(Math.random() *(max-min+1))+ min;
  return gen.toString(); // fixed issue... had to be a string
};

// add a user
app.post("/users", (req, res) => {
    const userToAdd = req.body; //req.body to access data 

    //const get_id = gen_id();
    

    //const idUser = { ...userToAdd, id: get_id}
    // add id to object
    //const idUser = {
    //  id: get_id,
    //  name: userToAdd.name,
    //  job: userToAdd.job,
    //};

    userServices.addUser(userToAdd)
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((error) => {
        //console.error(error); --> print if i want
        res.status(500).send("error");
      });
});
    
// DELETE REQUEST ----------------------------------------------------

// remove user by id 
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  userServices.deleteUserById(id)
    .then((deletedUser) => {
      if (!deletedUser) {
        res.status(404).send("not found");
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => {
      res.status(500).send("error");
    });
});

// -------------------------------------------------------------
// backend server listening on our port --> put at end = 
// ensure that all the routes are set before starting server
app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});



  
  
  



 


