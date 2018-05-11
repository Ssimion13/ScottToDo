import React, {Component} from "react";
import { Button } from 'reactstrap';
import ToDoListComponent from "./ToDoListComponent.js";
import axios from "axios"

class ToDoList extends Component {
    constructor(){
        super();
        this.state = {
            toDos: [],
            title: "",
            description: ""
        };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);
    this.addToDo = this.addToDo.bind(this);
    }

    componentDidMount() {

            var config = {
                headers: {'Authorization': "bearer" + " " + localStorage.token}
            }
        axios.get("/api/ToDo", config)
        .then(response => {
            this.setState({toDos: response.data})
        })

    }

    handleChange(e){
        this.setState({[e.target.name] : e.target.value});
      }
    handleSubmit(e){
        e.preventDefault();
        var title = this.state.title;
        var description = this.state.description;
        if(title === "" ){
            alert("Please input a title for your to do!")
            return;
        }
        if(title.length >= 25) {
            alert("Your title is too long!");
            return;
        }
        if(description === ""){
            alert("Please input a description for your to do!")
            return;
        }
        if(title.length >= 60) {
            alert("Your title is too long!");
            return;
        }
           var inputToDo = {
              title,
              description
              }
            this.addToDo(inputToDo);
            
    }
    addToDo(ToDo){
        var config = {
            headers: {'Authorization': "bearer" + " " + localStorage.token}
        }
        axios.post('/api/ToDo', ToDo, config).then(response =>{
           
            this.setState((prevState) => {
                return {
                    title: "",
                    description: "",
                    toDos: [...prevState.toDos, response.data ]}
              })
        })
      }

    deleteToDo(id){
        var config = {
            headers: {'Authorization': "bearer" + " " + localStorage.token}
        }
        axios.delete(`/api/ToDo/${id}`, config)
            this.setState(prevState=>{
                const filteredToDos = prevState.toDos.filter(toDo=>{
                    return toDo._id !== id;
                })
                return {toDos: filteredToDos}
            })

    }

render(props){
    let isAuthenticated = false
    if (localStorage.token){
        isAuthenticated = true
    }
    return(

        <div className="toDoMainDiv">
            { isAuthenticated ? 
            <div className="createToDoDiv">
              <input placeholder="Title: Max Characters: 60" value={this.state.title} onChange={this.handleChange} className="createToDoInput" name="title"/>
              <input placeholder="Description Max Characters: 60" value={this.state.description} onChange={this.handleChange} className="createToDoInput" name="description" />
              <Button size="lg" className="toDoAddButton" color="primary" onClick={this.handleSubmit}> Add </Button>
            </div>
            : <div> 
                <h1> Please login to view. </h1> 
              </div> }

            {isAuthenticated ? <h2 className="toDoHead"> Current To Do List </h2> : null }
            

            <ToDoListComponent  delete={this.deleteToDo} toDos = {this.state.toDos} />
      
               
        </div> 
    )
}



}

export default ToDoList;