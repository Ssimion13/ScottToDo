import React from "react";
import {Button} from "reactstrap"
function ToDoListComponent(props){
  const styles={
  }
  const allToDo = props.toDos.map((x,i) =>{

    return(
        <div key ={x + i} className="toDo">
            <div className ="toDoText" style={styles}>
              <div className="title" > {x.title} </div>
              <br/>
              <div className="description" > {x.description} </div>
            <Button color="info"  size="sm" onClick={()=>props.delete(x._id)}> Done! </Button>  
            </div>
        </div>
)
  })

  return(
    <div className="mappedToDos">
        {allToDo}
    </div>
  )
}

export default ToDoListComponent