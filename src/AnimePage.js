import React, { Component } from 'react';
import ReviewForm from './ReviewForm';
import ReviewCard from './ReviewCard';

export default class AnimePage extends Component {
  state =  {
    id: "",
    title:"",
    img_url:"",
    description:"",
    rating:0,
    screen:"",
    age_rating:"",
    reviews:[]
  }
  componentDidMount(){
    const id = this.props.match.params.id
    fetch(`http://localhost:3000/animes/${id}`)
    .then(resp=>resp.json())
    .then(anime => this.setState(anime))
  }
  render() {
    console.log("AnimePage State",this.state);
    const {id,title,img_url,description,rating,screen,age_rating,reviews} = this.state
    return (
      <div className="anime-wrapper">
          <div className="row show-me-border anime-detail">
            <div className="col-md-4 show-me-borde">
              <img src={img_url} alt={title}/>
            </div>
            <div className="col-md-8 show-me-border">
                <h2>{title}</h2>
                <h4>Screen: {screen}</h4>
                <h4>Audience: {age_rating}</h4>
                <h4>Rating: {rating}</h4>
                <p>{description}</p>
            </div>
          </div>
          <div className="row">
              <ReviewCard/>
              <ReviewForm animeId={id}/>
          </div>
      </div>
    )
  }
}
