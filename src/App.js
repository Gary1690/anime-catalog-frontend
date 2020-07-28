import React from 'react';
import logo from './logo.svg';
import './App.css';
import{  Redirect,Route, Switch } from 'react-router-dom'
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
    user: null
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

  handleLogout = () =>{
    this.setState({ user:null})
    window.localStorage.removeItem("userId")
  }


  handleFavorite = (anime_id, history) => {
    const user_id = parseInt(window.localStorage.getItem("userId"))
    if(!user_id){
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
          user_id,
          anime_id
        })
      })
      .then(resp => resp.json())
      .then(favorite => {
        history.push("/profile")
        this.setState( prevState =>{
          if(!prevState.user.animes.find(a=> a.id === favorite.anime.id)){
            const newState = {...prevState}
            newState.user.animes = [...prevState.user.animes,favorite.anime]
            return newState
          }
          return prevState
        })
      })
    }
  }

  render() {
    let animesToDisplay = this.filterBy()
    console.log("app",this.state.user)
    return (
      <div>
        <NavBar filter={this.state.filter} handleSearch={this.handleSearch} handleLogout={this.handleLogout} user={this.state.user}/>
        <Switch>
          <Route exact path="/" render={routerProps => <Home {...routerProps} animes={animesToDisplay}/>}/>
          <Route path="/Anime/:id" render={routerProps => <AnimePage {...routerProps} animes={this.state.animes} handleFavorite={this.handleFavorite}/>}/>
          <Route path="/Profile" render={routerProps => this.state.user ? <Profile {...routerProps} user={this.state.user}/>:<Redirect to="/login" />}/>
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

// function PrivateRoute({ children, ...rest }) {
//   return (
//     <Route  {...rest} render={({ location }) =>
//         fakeAuth.isAuthenticated ? (children) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }