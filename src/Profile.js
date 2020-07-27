import React from 'react'
import AnimeCard from './AnimeCard'

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
                {props.user.animes ? props.user.animes.map(userAnime => <AnimeCard key={userAnime.id} {...userAnime} history={props.history}/>) : null}
            </div>
            
       </div> 
    )
}

export default Profile