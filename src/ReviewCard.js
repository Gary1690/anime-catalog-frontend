import React from 'react'

const ReviewCard = (props) => {
  
  
  return(
    <div className="review-card row show-me-border">
        <div className="col-1" style={{textAlign:"center"}}>
          <img 
          src="https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg"
          alt="random user"
          />
          <span><strong>Admin</strong></span>
        </div>
        <div className="col-9">
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eleifend 
          ullamcorper nisi, non eleifend ipsum venenatis et. Duis sit amet massa euismod,
          laoreet lorem at, aliquet nisi. Donec laoreet, libero id auctor sagittis, justo 
          turpis facilisis ante, ac scelerisque augue ipsum quis elit. 
          </p>
        </div>
        <div className="col-2">
          <span>★★★★★</span>
        </div>
       
    </div>
  )
}

export default ReviewCard;