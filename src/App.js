import React from 'react';
import logo from './logo.svg';
import './App.css';
import{ Route, Switch } from 'react-router-dom'
import Home from './Home'
import AnimePage from './AnimePage'
import NavBar from './Navbar'
import Profile from './Profile'
import Login from './Login'
import Auth from './Auth'


const API = 'http://localhost:3000/animes'

class App extends React.Component {

  state = {
    animes: [],
    filter: "",
    user: {}
  }

  componentDidMount(){
    fetch(API)
    .then(resp => resp.json())
    .then(animes =>this.setState({ animes }))
  }

  handleSearch = (e) => {
    this.setState({filter: e.target.value})
  }

  filterBy = () => {
    return this.state.animes.filter(anime => anime.title.toLowerCase().includes(this.state.filter.toLowerCase()))
  }

  handleUser = (user) =>{
    this.setState({ user })
  }


  handleFavorite = (anime_id, history) => {
    const user_id = parseInt(window.localStorage.getItem("userId"))
    fetch('http://localhost:3000/favorites' , {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body:JSON.stringify({
        user_id,
        anime_id
      })
    })
    .then(resp => resp.json())
    .then(favorite => {
      history.push("/profile")
      this.setState({userAnime: [...this.state.userAnime, favorite.anime]})
    })
  }

  render() {
    let animesToDisplay = this.filterBy()
    console.log(animesToDisplay)
    return (
      <div>
        <NavBar filter={this.state.filter} handleSearch={this.handleSearch}/>
        <Switch>
          <Route exact path="/" render={routerProps => <Home {...routerProps} animes={animesToDisplay}/>}/>
          <Route path="/Anime/:id" render={routerProps => <AnimePage {...routerProps} animes={this.state.animes} handleFavorite={this.handleFavorite}/>}/>
          <Route path="/Profile" render={routerProps => <Profile {...routerProps} user={this.state.user}/>}/>
          <Route path="/Login" render={routerProps => <Auth {...routerProps} handleUser={this.handleUser}/>}/> 
          {/* 
          <Route path="/Anime/Edit" component={AnimeForm}/>
          */}
        </Switch>
      </div>
    )
  }
}

export default App;
