import express from "express";

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