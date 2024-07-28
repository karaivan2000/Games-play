import { Link } from "react-router-dom";
import { pathToUrl } from "../../../utils.js/pathUtils";
import Path from "../../../path";

export default function LatestGame({
    _id,
    imageUrl,
    title,
}) {
    return (
        <div className="game">
            <div className="image-wrap">
                <img src={imageUrl} />
            </div>
            <h3>{title}</h3>
            <div className="rating">
                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
            </div>
            <div className="data-buttons">
                <Link to={pathToUrl(Path.GameDetails, { gameId: _id })} className="btn details-btn">Details</Link>
            </div>
        </div>
    );
}