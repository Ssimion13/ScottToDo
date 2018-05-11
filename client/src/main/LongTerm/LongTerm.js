import React, {Component} from "react";
import { Button } from 'reactstrap';
import LongTermComponent from "./LongTermComponent.js";
import axios from "axios"

class LongTerm extends Component {
    constructor(){
        super();
        this.state = {
            LongTermTodos: [],
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
        axios.get("/api/Long", config)
        .then(response => {
            this.setState({LongTermTodos: response.data})
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
        axios.post('/api/Long', ToDo, config).then(response =>{
            this.setState((prevState) => {
                return {
                    title: "",
                    description: "",
                    LongTermTodos: [...prevState.LongTermTodos, response.data ]}
              })
        })
      }

    deleteToDo(id){
        var config = {
            headers: {'Authorization': "bearer" + " " + localStorage.token}
        }
        axios.delete(`/api/Long/${id}`, config)
            this.setState(prevState=>{
                const filteredLongTermTodos = prevState.LongTermTodos.filter(toDo=>{
                    return toDo._id !== id;
                })
                return {LongTermTodos: filteredLongTermTodos}
            })

    }

render(props){
    return(
        <div className="toDoMainDiv longTermDiv">
            <div className="createToDoDiv">
              <input placeholder="Title" value={this.state.title} onChange={this.handleChange} className="createToDoInput" name="title"/>
              <input placeholder="Description"  value={this.state.description} onChange={this.handleChange} className="createToDoInput" name="description" />
              <Button size="lg" className="toDoAddButton" color="primary" onClick={this.handleSubmit}> Add </Button>
            </div>
            <h2 className="toDoHead"> Long Term To Do List </h2>
            <LongTermComponent  delete={this.deleteToDo} LongTermTodos = {this.state.LongTermTodos} />
        </div>
    )
}



}

export default LongTerm;