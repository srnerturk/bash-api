const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cp = require("child_process");

const app = express();

var corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/api/run", (req, res) => {
  const command = req.body.command;
  cp.exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(stdout);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
