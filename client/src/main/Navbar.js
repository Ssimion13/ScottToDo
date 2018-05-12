import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';
import {Link, } from "react-router-dom";

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
    this.logout = this.logout.bind(this);
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  logout () {
    delete localStorage.token;
    delete localStorage.user;
    window.location.href="./"
  }



  render() {
    let isAuthenticated = false
    if (localStorage.token){
        isAuthenticated = true
    }
    return (
      <div>
        <Navbar color="faded" light>
          <NavbarBrand href="/" className="mr-auto"> To Do List </NavbarBrand>
          {isAuthenticated ? <Button onClick={this.logout} > Log Out </Button> : null }
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
          {isAuthenticated ?
            <Nav navbar>
              <NavItem>
               <Link to="ToDoList"> Current To Do List </Link>
              </NavItem>
              <NavItem>
                <Link to="LongTerm"> Long Term Goals </Link>
              </NavItem>
              <NavItem>
                <Link to="HobbyList"> Current Hobby To Do </Link>
              </NavItem>
            </Nav>
            : <Nav> 
                <NavItem>
                  Please Log In To View Links!
                </NavItem>
            </Nav>
          }
          </Collapse>
        </Navbar>
      </div>
    );
  }
}