const express = require("express");
const ToDoRoutes = express.Router();
const ToDo = require("../models/Todos");


ToDoRoutes.get("/", (req,res) => {
  ToDo.find( {user: req.user._id}, (err, todos) => {
    if (err) return res.status(500).send(err);
    return res.send(todos);
  })
})

ToDoRoutes.get("/:id", (req, res) => {
  ToDo.findOne({_id: req.params.id, user: req.user._id}, (err, todo) => {
    if(err) return res.status(500).send(err);
    if(!todo) return res.status(404).send("No todo item found");
    return res.send(todo);
  });
});

ToDoRoutes.post("/", (req,res) => {
  const newToDo = new ToDo(req.body);
  newToDo.user = req.user._id;
  newToDo.save(function (err, newToDo) {
    if (err)
    return res.status(500).send(err);
    return res.status(201).send(newToDo);
  });
});

ToDoRoutes.put("/:id", (req, res) => {
  ToDo.findOneAndUpdate({_id: req.params.id, user: req.user._id},  req.body, {new:true}, (err,updatedToDo) => {
    if(err) return res.status(500).send(err);
    return res.send(updatedToDo);
  });
});

ToDoRoutes.delete("/:id", (req, res) => {
  ToDo.findOneAndRemove({ _id: req.params.id, user: req.user._id}, (err,removedToDo) => {
    if (err) return res.status(500).send(err);
    return res.status(202).send(removedToDo)
  })
})


module.exports = ToDoRoutes;
