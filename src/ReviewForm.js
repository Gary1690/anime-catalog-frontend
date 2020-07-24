import React from 'react'

class ReviewForm extends React.Component  {
  render(){
    return(
      <div className="col-12 form-div">
        <form className="">
          <div className="form-group col-6" style={{display:"inline-block"}}>
            <label for="content">Review</label>
            <input type="Text" className="form-control" id="content" />
          </div>
          <div className="form-group rating col-4" style={{display:"inline-block",marginTop:"1em"}}>
            <label>
              <input type="radio" name="stars" value="1" />
              <span className="icon">★</span>
            </label>
            <label>
              <input type="radio" name="stars" value="2" />
              <span className="icon">★</span>
              <span className="icon">★</span>
            </label>
            <label>
              <input type="radio" name="stars" value="3" />
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>   
            </label>
            <label>
              <input type="radio" name="stars" value="4" />
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>
              <span className="icon">★</span>
            </label>
            <label>
              <input type="radio" name="stars" value="5" />
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