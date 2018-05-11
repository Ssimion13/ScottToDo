const express = require("express");
const LongRoutes = express.Router();
const Long = require("../models/Long");


LongRoutes.get("/", (req,res) => {
  Long.find( {user: req.user._id}, (err, todos) => {
    if (err) return res.status(500).send(err);
    return res.send(todos);
  })
})

LongRoutes.get("/:id", (req, res) => {
  Long.findOne({_id: req.params.id, user: req.user._id}, (err, todo) => {
    if(err) return res.status(500).send(err);
    if(!todo) return res.status(404).send("No todo item found");
    return res.send(todo);
  });
});

LongRoutes.post("/", (req,res) => {
  const newLong = new Long(req.body);
  newLong.user = req.user._id;
  newLong.save(function (err, newLong) {
    if (err)
    return res.status(500).send(err);
    return res.status(201).send(newLong);
  });
});

LongRoutes.put("/:id", (req, res) => {
  Long.findOneAndUpdate({_id: req.params.id, user: req.user._id},  req.body, {new:true}, (err,updatedLong) => {
    if(err) return res.status(500).send(err);
    return res.send(updatedLong);
  });
});

LongRoutes.delete("/:id", (req, res) => {
  Long.findOneAndRemove({ _id: req.params.id, user: req.user._id}, (err,removedLong) => {
    if (err) return res.status(500).send(err);
    return res.status(202).send(removedLong)
  })
})


module.exports = LongRoutes;

