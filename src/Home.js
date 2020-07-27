import React from 'react'
import AnimeCard from './AnimeCard'

const Home = props => {
    console.log(props)
    return (
        <>
            <h1>Anime Collection</h1>
            <div>
                {props.animes.map(anime => <AnimeCard key={anime.id} {...anime} history={props.history} />)}
            </div>
        </>
    )
}

export default Home