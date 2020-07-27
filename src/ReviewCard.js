import React from 'react'

const ReviewCard = (props) => {
  
  console.log("Review Card Props", props)

  return(
    
    <div className="review-card row show-me-border">
        <div className="col-1" style={{textAlign:"center"}}>
          <img 
          src={props.user.img_url}
          alt="random user"
          />
          <span><strong>{props.user.username}</strong></span>
        </div>
        <div className="col-9">
          <p>
          {props.content}
          </p>
        </div>
        <div className="col-2">
        <span>{"★".repeat(props.rating)}</span>
        </div>
       
    </div>
  )
}

export default ReviewCard;

// ★★★★★