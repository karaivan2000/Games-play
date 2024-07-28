import { useContext, useEffect, useMemo, useReducer, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import * as gameService from "../../services/gameService";
import * as commentService from "../../services/commentService";
import AuthContext from "../../context/authContext";
import reducer from "./commentReducer";
import useForm from "../../hooks/useForm";
import Path from "../../path";
import { pathToUrl } from "../../utils.js/pathUtils";


export default function GameDetails() {
    const { email, userId } = useContext(AuthContext)
    const [game, setGame] = useState({});
    //const [comments, setComments] = useState([]);
    const [comments, dispatch] = useReducer(reducer, []);
    const { gameId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        gameService.getOne(gameId)
            .then(setGame)
        commentService.getAll(gameId)
            .then(result => {
                dispatch({
                    type: `GET_ALL_COMMENTS`,
                    payload: result,
                })
            })
    }, [gameId]);

    const addCommentHandler = async (values) => {

        const newComment = await commentService.create(
            gameId,
            values.comment,
        );

        newComment.owner = { email };
        //setComments(state => [...state, { ...newComment, author: { email } }]);
        dispatch({
            type: `ADD_COMMENT`,
            payload: newComment
        });
    };

    const deleteButtonClickHandler = async () => {
        const hasConfirmed = confirm(`Are you sure you want to delete ${game.title}`);

        if (hasConfirmed) {
            await gameService.remove(gameId);

            navigate(`/games`);
        }
    };

    const { values, onChange, onSubmit } = useForm(addCommentHandler, {
        comment: ``,
    });

    const isOwner = userId === game._ownerId;

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>
                <p className="text">
                    {game.summary}
                </p>
                {/* Bonus ( for Guests and Users ) */}
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {/* list all comments for current game (If any) */}
                        {comments.map(({ _id, text, owner: { email } }) => (
                            <li key={_id} className="comment">
                                <p>{email}: {text}</p>
                            </li>
                        ))}

                    </ul>
                    {/* Display paragraph: If there are no games in the database */}
                    {comments.length === 0 && (
                        <p className="no-comment">No comments.</p>
                    )}
                </div>
                {/* Edit/Delete buttons ( Only for creator of this game )  */}
                {isOwner && (
                    <div className="buttons">
                        <Link to={pathToUrl(Path.GameEdit, { gameId })} className="button">
                            Edit
                        </Link>
                        <button className="button" onClick={deleteButtonClickHandler}>Delete</button>
                    </div>
                )}

            </div>
            {/* Bonus */}
            {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={onSubmit}>

                    <textarea
                        name="comment"
                        value={values.comment}
                        onChange={onChange}
                        placeholder="Comment......"
                        defaultValue={""}
                    />
                    <input
                        className="btn submit"
                        type="submit"
                        defaultValue="Add Comment"
                    />
                </form>
            </article>
        </section>
    );
}