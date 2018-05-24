import React, {Component} from "react";
import { Button } from 'reactstrap';
import HobbyListComponent from "./HobbyListComponent.js";
import axios from "axios"

class HobbyList extends Component {
    constructor(){
        super();
        this.state = {
            Hobbies: [],
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
            headers: {Authorization: "bearer " + localStorage.token}
        }
        axios.get("/api/Hobby", config)
        .then(response => {
            console.log(response.data);
            this.setState({Hobbies: response.data})
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

           var inputHobby = {
              title,
              description
              }
            this.addToDo(inputHobby);
    }
    addToDo(Hobby){
        var config = {
            headers: {Authorization: "bearer " + localStorage.token}
        }
        axios.post('/api/Hobby', Hobby, config).then(response =>{
           
            this.setState((prevState) => {
                return {
                    title: "",
                    description: "",
                    Hobbies: [...prevState.Hobbies, response.data ]}
              })
        })
      }

    deleteToDo(id){
        var config = {
            headers: {Authorization: "bearer " + localStorage.token}
        }
        axios.delete(`/api/Hobby/${id}`, config)
            this.setState(prevState=>{
                const filteredHobbies = prevState.Hobbies.filter(toDo=>{
                    return toDo._id !== id;
                })
                return {Hobbies: filteredHobbies}
            })

    }

render(props){
    console.log(this.state)
    return(
        <div className="toDoMainDiv hobbyListDiv">
            <div className="createToDoDiv">
              <input placeholder="Title" value={this.state.title} onChange={this.handleChange} className="createToDoInput" name="title"/>
              <input placeholder="Description" value={this.state.description} onChange={this.handleChange} className="createToDoInput" name="description" />
              <Button size="lg" className="toDoAddButton" color="warning" onClick={this.handleSubmit}> Add </Button>
            </div>
            <h2 className="toDoHead"> Hobby To Do List </h2>
            <HobbyListComponent  delete={this.deleteToDo} Hobbies = {this.state.Hobbies} />
        </div>
    )
}



}

export default HobbyList;