import React from "react";

function LongTermList(props){
  const allToDo = props.LongTermTodos.map((x,i) =>{

    return(
        <div key ={x + i} className="toDo">
            <div className ="toDoText">
              <div className="title"> {x.title} </div>
              <div className="description"> {x.description} </div>
            <button onClick={()=>props.delete(x._id)}> Delete </button>  
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

export default LongTermList