import React from 'react'

const AnimeCard = props => {

    return (
        <div className="card">
            <p><strong>{props.title}</strong></p>
            <img src={props.img_url} alt={props.title}/>
            <button className="btn btn-danger" onClick={()=>{props.history.push(`anime/${props.id}`)}}>View More</button>
        </div>
        )
}

export default AnimeCard

