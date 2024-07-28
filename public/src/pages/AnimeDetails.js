import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AnimeDetails = () => {
    const { id } = useParams();
    const [anime, setAnime] = useState({});
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`http://localhost:5000/api/anime/${id}`);
            setAnime(result.data.anime);
            setComments(result.data.comments);
        };
        fetchData();
    }, [id]);

    const onCommentSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `http://localhost:5000/api/comments/${id}`,
                { text: commentText },
                { headers: { 'x-auth-token': localStorage.getItem('token') } }
            );
            setComments([...comments, res.data]);
            setCommentText('');
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div>
            <h1>{anime.title}</h1>
            <img src={anime.imageUrl} alt={anime.title} />
            <p>{anime.description}</p>
            <h2>Episodes: {anime.episodes}</h2>
            <h3>Comments</h3>
            <ul>
                {comments.map(comment => (
                    <li key={comment._id}>
                        <strong>{comment.user.username}:</strong> {comment.text}
                    </li>
                ))}
            </ul>
            {user && (
                <form onSubmit={onCommentSubmit}>
                    <textarea
                        value={commentText}
                        onChange={e => setCommentText(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit">Add Comment</button>
                </form>
            )}
        </div>
    );
};

export default AnimeDetails;
