const env = require("dotenv").config();  
const bodyParser = require("body-parser");
const express = require("express");
const expressJwt = require("express-jwt");
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 7000;
const path = require("path")


app.use(express.static(path.join(__dirname, "client", "build")))

process.env = {
  ...process.env,
  ...env.parsed
}

app.use(express.static(path.join(__dirname, "client", "build")))
app.use("/api", expressJwt({secret: process.env.SECRET}));
app.use(bodyParser.json());
app.use(morgan('dev'));


app.use("/auth", require("./routes/auth"));
app.use("/api/ToDo", require('./routes/ToDos.js'));
app.use("/api/Long", require('./routes/Long.js'));
app.use("/api/Hobby",require('./routes/Hobby.js'));



mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ScottToDo', err => {
  if (err) throw err;
  console.log("DB Connected.")
})

app.get("*", (req, res) => {  
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(port, () => {
  console.log("Listening in port " + port)
});