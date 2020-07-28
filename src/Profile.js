import React from 'react'
import AnimeCard from './AnimeCard'
import Button from 'react-bootstrap/Button'

const EmptyList = (props) =>{
    
    return (
        <div className="empty-list">
            <p>Your list is currently empty. Try adding something to it!</p>
            <Button variant="outline-primary" onClick={()=>{props.history.push("/")}}>Explore</Button>
        </div>
    )
}

const Profile = (props) => {
    return(

       <div>
            <div className="row">
                <div className="col-3">
                    <img className="profile-img" src={props.user.img_url} alt={props.user.username} />
                </div>
                <div className="col-9">
                    <h1 className="profile-header">Welcome, {props.user.username}</h1>
                </div>
            </div>

            <h1>My Favorites</h1>
            
            <div className="row">
                {props.user.animes.length ? props.user.animes.map(userAnime => <AnimeCard key={userAnime.id} {...userAnime} history={props.history}/>) : <EmptyList {...props}/>}
            </div>
            
       </div> 
    )
}

export default Profile