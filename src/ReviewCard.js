import React from 'react'

const ReviewCard = (props) => {
  
  return(
    <div className="review-card row show-me-border">
        <div className="col-1" style={{textAlign:"center"}}>
          <img 
          src={props.user.img_url}
          alt="random user"
          />
          <span><strong>{props.user.username}</strong></span>
        </div>
        <div className="col-8">
          <p>
          {props.content}
          </p>
        </div>
        <div className="col-2">
          <span>{"★".repeat(props.rating)}</span>
        </div>
        <div className="col-1">
          <button style={{marginLeft:"0.2em"}} className="btn btn-outline-success">✎</button>
          <button 
            style={{marginLeft:"0.2em"}} 
            className="btn btn-outline-danger"
            onClick={()=>{props.deleteReview(props.id)}}>⨂</button>
        </div>
    </div>
  )
}

export default ReviewCard;

// ★★★★★