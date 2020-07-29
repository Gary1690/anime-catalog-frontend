import React from 'react'
import {Button} from 'react-bootstrap'


const NoMatch = (props) => {
  return (
    <div className="empty-list">
        <h1>Opps the place you want to go doesn't exist why don't you explore our Homepage!</h1>
        <Button variant="outline-primary" onClick={()=>{props.history.push("/")}}>Explore</Button>
    </div>

  )  
}

export default NoMatch;
