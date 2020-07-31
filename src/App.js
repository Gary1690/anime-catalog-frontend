import React from 'react';
import './App.css';
import {Redirect,Route,Switch} from 'react-router-dom'
import Home from './Home'
import AnimePage from './AnimePage'
import NavBar from './Navbar'
import Profile from './Profile'
import Auth from './Auth'
import NoMatch from './NoMatch'


const API = 'http://localhost:3000/animes'

class App extends React.Component {

  state = {
    animes: [],
    filter: "",
    user: null
  }

  componentDidMount(){
    fetch(API)
    .then(resp => resp.json())
    .then(animes =>{
      const user = JSON.parse(window.localStorage.getItem('user')) 
      this.setState(prevState => ({...prevState,animes:animes,user:user}))
    })
  }

  handleSearch = (e) => {
    this.setState({filter: e.target.value})
  }

  filterBy = () => {
    debugger
    return this.state.animes.filter(anime => anime.title.toLowerCase().includes(this.state.filter.toLowerCase()))
  }

  handleUser = (user) =>{
    this.setState({ user })
  }

  handleLogout = () =>{
    this.setState({ user:null})
    window.localStorage.removeItem("userId")
  }

  updateAnimeList = (updatedAnime) =>{
    const animes = this.state.animes.map (anime=>{
      if( anime.id === updatedAnime.id){
        return updatedAnime
      }
      return anime
    })
    this.setState({animes:animes})
  }

  handleUnfavorite = (anime_id) => {
    const user = this.state.user
    fetch(`http://localhost:3000/favorites/${user.id}` , {
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body:JSON.stringify({
        user_id:user.id,
        anime_id
      })
    })
    .then(resp=> resp.json())
    .then(favorite=> {
      const userNewFavoriteAnimeIds = user.my_anime_ids.filter(id => id!==favorite.anime.id)
      this.setState(prevState => {
        const user = {...prevState.user}
        user.my_anime_ids = userNewFavoriteAnimeIds
        window.localStorage.setItem("user", JSON.stringify(user))
        return {...prevState,user:user}
      })
    })

  }

  handleFavorite = (anime_id,history) => {
    
    if(!this.state.user){
      alert("You must be logged in to add it to your favorites")
      history.push("/login")
    }else{
      fetch('http://localhost:3000/favorites' , {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Accept':'application/json'
        },
        body:JSON.stringify({
          user_id:this.state.user.id,
          anime_id
        })
      })
      .then(resp => resp.json())
      .then(favorite => {
        this.setState( prevState =>{
          if(!prevState.user.my_anime_ids.find(id=> id === favorite.anime.id)){
            const newState = {...prevState}
            newState.user.my_anime_ids = [...prevState.user.my_anime_ids,favorite.anime.id]
            window.localStorage.setItem("user", JSON.stringify(newState.user))
            return newState
          }
          return prevState
        })
      })
    }
  }

  deleteAnime = (deletedAnime)=>{
    const animeList =  this.state.animes.filter( anime=> anime.id !== deletedAnime.id)
    this.setState({animes:animeList}) 
  }

  currentUserfavorites =()=>{
    if(this.state.user){
      return this.state.animes.filter( anime =>{
        if (this.state.user.my_anime_ids.includes(anime.id)){
          return anime
        }
      })
    }
    return null 
  }

  render() {
    let animesToDisplay = this.filterBy()
    return (
      <div>
        <NavBar filter={this.state.filter} handleSearch={this.handleSearch} handleLogout={this.handleLogout} user={this.state.user}/>
        <Switch>
          <Route exact path="/" render={routerProps => <Home {...routerProps} animes={animesToDisplay}/>}/>
          <Route exact path="/Anime/:id" render={routerProps => <AnimePage user={this.state.user} handleUnfavorite={this.handleUnfavorite} {...routerProps} deleteAnime={this.deleteAnime} updateAnimeList={this.updateAnimeList} animes={this.state.animes} handleFavorite={this.handleFavorite}/>}/>
          <Route exact path="/Profile" render={routerProps => this.state.user ? <Profile {...routerProps} user={this.state.user} animes={this.currentUserfavorites()}/>:<Redirect to="/login" />}/>
          <Route exact path="/Login" render={routerProps => !this.state.user ? <Auth {...routerProps} handleUser={this.handleUser}/>:<Redirect to="/profile" />}/> 
          <Route path="*" component={NoMatch}/>
   
          {/* <Route path="/Login" render={routerProps => <Auth {...routerProps} user={this.state.user} handleUser={this.handleUser}/>}/>  */}

        </Switch>
      </div>
    )
  }
}

export default App;
