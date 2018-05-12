import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import {Link} from "react-router-dom"

class Example extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <div className="thumbnailDiv">
        <Button className="collapsibleToggleButton" color="primary" size="lg" onClick={this.toggle} style={{ marginBottom: '1rem' }}> Click Here To Start</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
                <div className="collapseButtons">
                    <Link to="ToDoList">
                        <Button size="lg" color="danger"> Current To Dos </Button>
                    </Link>
                    <Link to="LongTerm">
                        <Button className="middleThumbnailButton" size="lg" color="primary"> Long Term Todos </Button>
                    </Link>
                    <Link to="HobbyList">
                        <Button size="lg" color="secondary">Hobby To Dos</Button>
                    </Link>
                </div>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default Example;