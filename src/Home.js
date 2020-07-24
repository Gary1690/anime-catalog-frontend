import React from 'react'
import AnimeCard from './AnimeCard'

const Home = props => {
    return (
        <div>
            {props.animes.map(anime => <AnimeCard key={anime.id} {...anime} />)}
        </div>
    )
}

export default Home