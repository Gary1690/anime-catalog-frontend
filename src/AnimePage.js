import React, { Component } from 'react';
import ReviewForm from './ReviewForm';
import ReviewCard from './ReviewCard';
import AnimeModal from './AnimeModal';


export default class AnimePage extends Component {
  state =  {
    id: "", 
    title:"",
    img_url:"",
    description:"",
    get_rating:0,
    screen:"",
    age_rating:"",
    reviews:[],
    showModal:false,
  }

  toggleModal = () => this.setState( prevState => ({showModal:!prevState.showModal}));

  componentDidMount(){
    const id = this.props.match.params.id
    fetch(`http://localhost:3000/animes/${id}`)
    .then(resp=>resp.json())
    .then(anime => this.setState(anime))
  }

  addReview = (newReview) => {
    this.setState({
      reviews: [...this.state.reviews, newReview],
      get_rating: newReview.anime_rating})
  }

  updateAnimePage = (anime) =>{
    this.setState(anime)
  }

  handleSubmit = (e) =>{
    e.preventDefault()
  }

  deleteAnime = ()=>{
    const id = this.props.match.params.id
    fetch(`http://localhost:3000/animes/${id}`,{
      method:"DELETE",
      headers:{
        'Content-Type':'application/json',
        'Accept': 'application/json'
      }
    })
    .then(resp=>resp.json())
    .then(anime => {
      this.props.deleteAnime(anime)
      this.props.history.push("/") 
    })
  }

  deleteReview = (id) =>{
    fetch(`http://localhost:3000/reviews/${id}`,{
      method:"DELETE",
      headers:{
        'Content-Type':'application/json',
        'Accept': 'application/json'
      }
    }).then(resp=>resp.json())
    .then(deletedReview => {
      const reviews = this.state.reviews.filter(review=>review.id !== deletedReview.id)
      this.setState({reviews:reviews,get_rating:deletedReview.anime_rating})
    })
  }

  render() {
    const {id,title,img_url,description,get_rating,screen,age_rating,reviews} = this.state
    return (
      
      <div className="anime-wrapper">
          <div className="row show-me-border anime-detail">
            <div className="col-lg-4 show-me-borde" style={{marginRight:"em"}}>
              <img src={img_url} alt={title} />
            </div>
            <div className="col-lg-8 show-me-border">
                <h2 style={{display:"block"}}>{title} 
                  <button style={{marginLeft:"0.2em"}} className="btn btn-outline-success" onClick={this.toggleModal}>✎</button>
                  <button style={{marginLeft:"0.2em"}}  className="btn btn-outline-danger" onClick={this.deleteAnime}>⨂</button>
                </h2>
                <h4>Screen: {screen}</h4>
                <h4>Audience: {age_rating}</h4>
                <h4>Rating: {get_rating}</h4>
                <p>{description}</p>
                <button className="btn btn-sm btn btn-outline-primary" onClick={() => this.props.handleFavorite(id, this.props.history)}>Favorite <span role="img">💙</span></button>
            </div>
          </div>
          <div className="row">
              {reviews.map(review => <ReviewCard key={review.id} {...review} deleteReview={this.deleteReview}/>)}
              <ReviewForm animeId={id} addReview={this.addReview} history={this.props.history}/>
          </div>
          <AnimeModal 
            show={this.state.showModal}
            toggleModal={this.toggleModal}
            id={id} 
            title={title}
            img_url={img_url}
            description={description}
            screen={screen}
            age_rating={age_rating}
            updateAnimePage={this.updateAnimePage}
            updateAnimeList ={this.props.updateAnimeList}
            />
      </div>
      
    )
  }
}
