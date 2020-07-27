import React from 'react'

class ReviewForm extends React.Component  {
  state = {
    content:"",
    rating:"0"
  }
  changeHandler = (e) =>{
    this.setState({[e.target.name]:e.target.value})
  }
  
  submitHanlder = (e) =>{
    e.preventDefault()
    const review = {}
    review.content = this.state.content
    review.rating = parseInt(this.state.rating)
    review.anime_id = this.props.animeId
    review.user_id = parseInt(window.localStorage.getItem('userId'))

    const serverData = {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body:JSON.stringify(review)
    }

    fetch('http://localhost:3000/reviews',serverData)
    .then(resp=> resp.json())
    .then(review=>console.log(review))
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