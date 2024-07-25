import { useNavigate, useParams } from "react-router-dom";
import * as gameService from "../../services/gameService";
import useForm from "../../hooks/useForm";
import { useEffect, useState } from "react";

export default function GameEdit() {
    const navigate = useNavigate();
    const {gameId} = useParams();
    const [game, setGame] = useState({
        title: ``,
        category: ``,
        maxLevel: ``,
        imageUrl: ``,
        summary: ``,
    });

    useEffect(() => {
        gameService.getOne(gameId)
            .then(result => {
                setGame(result);
            })
    }, [gameId]);

    const editGameSubmitHandler = async (values) => {
        try {
            await gameService.edit(gameId, values);

            navigate(`/games`);
        } catch (err) {
            console.log(err);
        }
    }

    const { values, onChange, onSubmit } = useForm(editGameSubmitHandler, game);

    return (
        <section id="create-page" className="auth">
            <form id="create" onSubmit={onSubmit}>
                <div className="container">
                    <h1>Create Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter game title..."
                        onChange={onChange}
                        value={values.title}
                    />
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        placeholder="Enter game category..."
                        onChange={onChange}
                        value={values.category}
                    />
                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        min={1}
                        placeholder={1}
                        onChange={onChange}
                        value={values.maxLevel}
                    />
                    <label htmlFor="game-img">Image:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="Upload a photo..."
                        onChange={onChange}
                        value={values.imageUrl}
                    />
                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" defaultValue={""} onChange={onChange} value={values.summary}/>
                    <input
                        className="btn submit"
                        type="submit"
                        defaultValue="Edit Game"
                    />
                </div>
            </form>
        </section>
    );
}