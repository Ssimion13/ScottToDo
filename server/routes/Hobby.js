const express = require("express");
const HobbyRoutes = express.Router();
const Hobby = require("../models/Hobby");


HobbyRoutes.get("/", (req,res) => {
  Hobby.find( {user: req.user._id}, (err, todos) => {
    if (err) return res.status(500).send(err);
    return res.send(todos);
  })
})

HobbyRoutes.get("/:id", (req, res) => {
  Hobby.findOne({_id: req.params.id, user: req.user._id}, (err, todo) => {
    if(err) return res.status(500).send(err);
    if(!todo) return res.status(404).send("No todo item found");
    return res.send(todo);
  });
});

HobbyRoutes.post("/", (req,res) => {
  const newHobby = new Hobby(req.body);
  newHobby.user = req.user._id;
  newHobby.save(function (err, newHobby) {
    if (err)
    return res.status(500).send(err);
    return res.status(201).send(newHobby);
  });
});

HobbyRoutes.put("/:id", (req, res) => {
  Hobby.findOneAndUpdate({_id: req.params.id, user: req.user._id},  req.body, {new:true}, (err,updatedHobby) => {
    if(err) return res.status(500).send(err);
    return res.send(updatedHobby);
  });
});

HobbyRoutes.delete("/:id", (req, res) => {
  Hobby.findOneAndRemove({ _id: req.params.id, user: req.user._id}, (err,removedHobby) => {
    if (err) return res.status(500).send(err);
    return res.status(202).send(removedHobby)
  })
})


module.exports = HobbyRoutes;

