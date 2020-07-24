import React from 'react';
import logo from './logo.svg';
import './App.css';
import{ Route, Switch } from 'react-router-dom'
import Home from './Home'


const API = 'http://localhost:3000/animes'

class App extends React.Component {

  state = {
    animes: []
  }

  componentDidMount(){
    fetch(API)
    .then(resp => resp.json())
    .then(animes =>
      this.setState({ animes }))
  }

  render() {
    console.log(this.state)
    return (
      <div>
        {/* <Navbar /> */}
        <Switch>
          <Route exact path="/" render={routerProps => <Home {...routerProps} animes={this.state.animes}/>}/>
          {/* <Route path="/Anime/:id" render={routerProps => <AnimePage {...routerProps} animes={this.state.animes}/>}/>
          <Route path="/Profile" component={Profile}/>
          <Route path="/Anime/Edit" component={AnimeForm}/>
          <Route path="/Login" component={Auth}/> */}
        </Switch>
      </div>
    )
  }
}

export default App;
