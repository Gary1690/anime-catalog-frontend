import React from 'react'
import AnimeCard from './AnimeCard'

const Home = props => {
    console.log(props)
    return (
        <div>
            {props.animes.map(anime => <AnimeCard key={anime.id} {...anime} history={props.history} />)}
        </div>
    )
}

export default Home