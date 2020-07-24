import React from 'react'

const AnimeCard = props => {

    return (
        <div>
            <h2>{props.title}</h2>
            <img src={props.img_url}/>
        </div>
        )
}

export default AnimeCard

