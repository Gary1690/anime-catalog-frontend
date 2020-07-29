import React from 'react'

class ReviewForm extends React.Component  {
  state = {
    id:"",
    content:"",
    rating:"0"
  }

  changeHandler = (e) =>{
    this.setState({[e.target.name]:e.target.value})
  }
  
  submitHanlder = (e) =>{
    e.preventDefault()
    const currentReviewId = this.state.id
    const review = {}
    review.content = this.state.content
    review.rating = parseInt(this.state.rating)
    review.anime_id = this.props.animeId
    review.user_id = this.props.currentUserId
    if (!review.user_id){
      alert("You must be logged in to leave a comment!")
      this.props.history.push("/login")
    }else if (!this.validateForm()){
      alert("All fields must be completed before submission")
    }else{
      const serverData = {
        method:(currentReviewId ? 'PATCH' : 'POST'),
        headers:{
          'Content-Type':'application/json',
          'Accept':'application/json'
        },
        body:JSON.stringify(review)
      }

      fetch(`http://localhost:3000/reviews/${currentReviewId}`,serverData)
      .then(resp=> resp.json())
      .then(review=> currentReviewId? this.props.updateReview(review) : this.props.addReview(review))
      .then(
        this.setState({
          id:"",
          content:"",
          rating:"0"
        })
      )
    }
  }

  validateForm = ()=>{
    const {content,rating} =  this.state
    if (content==="" || rating === "0"){
      return false
    }
    return true
  }

  componentDidUpdate(prevProps){
    if ((this.props.reviewToBeEdited && this.props.reviewToBeEdited.id !== this.state.id)){
      const {id,content,rating} = this.props.reviewToBeEdited
      const newState =  { 
        id:id,
        content:content,
        rating:String(rating)
      }
      this.setState(newState)
    }

    if (!this.props.reviewToBeEdited && this.state.id !== ''){
      this.setState({
        id:"",
        content:"",
        rating:"0"
      })
    }
  } 
  
  render(){
    const {content,rating} = this.state;
    console.log(this.state);
    return(
      <div className="col-12 form-div show-me-border">
        <form className="" onSubmit={this.submitHanlder}>
          <div className="form-group col-6" style={{display:"inline-block"}}>
            <label htmlFor="content">Review</label>
            <input type="Text" className="form-control" id="content" name="content" value={content} onChange={this.changeHandler}/>
          </div>
          <div className="form-group rating" style={{display:"inline-block",margin:" 2em 1em"}}>
            <label>
              <input type="radio" name="rating" value="1" checked={rating ==="1"} onChange={this.changeHandler}/>
              <span className="icon">★</span>
            </label>
            <label>
              <input type="radio" name="rating" value="2" checked={rating ==="2"} onChange={this.changeHandler}/>
              <span className="icon">★</span>
              <span className="icon">★</span>
            </label>
            <label>
              <input type="radio" name="rating" value="3" checked={rating ==="3"} onChange={this.changeHandler}/>
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>   
            </label>
            <label>
              <input type="radio" name="rating" value="4" checked={rating ==="4"} onChange={this.changeHandler}/>
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>
            </label>
            <label>
              <input type="radio" name="rating" value="5" checked={rating ==="5"} onChange={this.changeHandler}/>
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>
            </label>
          </div>
         
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
  
}


export default ReviewForm;