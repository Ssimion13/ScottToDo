import React, {Component} from "react";
import { Jumbotron, Container } from 'reactstrap';
import Thumbnails from "./Thumbnails.js"
import {Button} from 'reactstrap';
import axios from "axios"

class FrontPage extends Component {
    constructor(){
        super();
        this.state = {
            username: "",
            password: "",
            signUser: "",
            signPass: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
    }
    
    handleChange(e){
        this.setState({[e.target.name] : e.target.value});
      }
    handleLogin(e){
        var username = this.state.username;
        var password = this.state.password;
        
        var user = {
            username: username,
            password: password
        }
        axios.post('/auth/login', user)
            .then( 
                response => {
                console.log(response.data)
                let token = response.data.token
                if(response.data.token){
                    localStorage.setItem("token", token);
                    localStorage.user = username;
                    alert(`Thank you for logging in, ${username}!`);
                    window.location.reload();
                }

            },
            error => {
                alert("Wrong Username or Password...");
            })    
        this.setState({
            username: "",
            password: ""
        })
    }
    handleSignup(e){
        var username = this.state.signUser;
        var password = this.state.signPass;
        
        var user = {
            username: username,
            password: password
        }
        console.log(user);
        axios.post('/auth/signup', user)
        .then( 
            response => {
                let token = response.data.token
                if(response.data.token){
                    localStorage.setItem("token", token);
                    localStorage.user = username;
                    window.location.reload();
                }

                },
            error => {
                alert("This username is already in use. Please pick another name!");
            }) 
        this.setState({
            signUser: "",
            signPass: ""
        })
    }

    render(){
        let isAuthenticated = false
        if (localStorage.token){
            isAuthenticated = true
        }
        let user = localStorage.user || "Work"
    return(
        <div className="frontPageMainDiv">
            <div className="frontPageContent1">
                <Jumbotron fluid  className="Jumbotron">
                    <Container fluid>
                        <h1 className="display-3">Hello, {user} !</h1>
                        <p className="lead">This is Scott's To Do List Website. Make it a productive day!</p>
                        <hr className="my-2" />
                        {!isAuthenticated ? 
                        <p>Please Log In below to use.</p> : <p> Please Click Below! </p> 
                        }
                    </Container>
                </Jumbotron>

            </div>
            {!isAuthenticated ?
            <div className="loginDiv">
              <h1> Login Here! </h1>
              <div className="formDiv">
                <input name="username" placeholder="username" value={this.state.username} onChange={this.handleChange}/>
                <input name="password" placeholder="password" value={this.state.password} type="password" onChange = {this.handleChange}/>
                <Button className="formButton" color="primary" size="lg" onClick={this.handleLogin} > Login </Button>
              </div>
              <br/> 
              <h2> Or Sign Up! </h2>
              <div className="formDiv">

                <input name="signUser" placeholder="username" value={this.state.signUser} onChange={this.handleChange}/>
                <input name="signPass" placeholder="password" value={this.state.signPass}  type="password" onChange = {this.handleChange}/>
                <Button className="formButton" color="primary" size="lg" onClick={this.handleSignup} > Signup </Button>
              </div>
            </div>
            : null }
            {isAuthenticated ?  <Thumbnails /> : null }
           
        </div>
    )
}
}

export default FrontPage;