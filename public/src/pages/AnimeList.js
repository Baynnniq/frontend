import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AnimeList = () => {
    const [animeList, setAnimeList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost:5000/api/anime');
            setAnimeList(result.data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Anime List</h1>
            <ul>
                {animeList.map(anime => (
                    <li key={anime._id}>
                        <Link to={`/anime/${anime._id}`}>
                            <h2>{anime.title}</h2>
                            <p>{anime.description}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AnimeList;
