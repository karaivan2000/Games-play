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
<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Recipe</title>
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n        .recipe, #comments {\n            display: none; /* Initially hidden */\n        }\n        .btn {\n            display: inline-block;\n            padding: 10px 20px;\n            font-size: 16px;\n            cursor: pointer;\n            color: #fff;\n            background-color: #007BFF;\n            border: none;\n            border-radius: 5px;\n            text-align: center;\n            margin-top: 20px;\n        }\n    "
    }}
  />
  {/*row*/}
  <div className="row">
    <header className="s-title">
      <h1>A luxurious black &amp; white chocolate cupcake</h1>
    </header>
    {/*content*/}
    <section className="content three-fourth">
      {/*button*/}
      <button className="btn" id="seeMoreBtn">
        See More
      </button>
      {/*recipe*/}
      <div className="recipe">
        <div className="row">
          {/*two-third*/}
          <article className="two-third">
            <div className="image">
              <a href="#">
                <img src="images/img.jpg" alt="" />
              </a>
            </div>
            <div className="intro">
              <p>
                <strong>
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et quas
                </strong>
              </p>
              <p>
                Molestias excepturi sint occaecati cupiditate non provident,
                similique sunt in culpa qui officia deserunt mollitia animi, id
                est laborum et dolorum fuga. Et harum quidem rerum facilis est
                et expedita distinctio. At vero eos et accusamus et iusto odio
                dignissimos ducimus qui blanditiis praesentium voluptatum
                deleniti atque corrupti quos dolores et quas molestias excepturi
                sint occaecati cupiditate non provident, similique sunt in culpa
                qui officia deserunt mollitia animi, id est laborum et dolorum
                fuga. Et harum quidem rerum facilis est et expedita distinctio.
              </p>
            </div>
            <div className="instructions">
              <ol>
                <li>
                  Heat oven to 160C/140C fan/gas 3 and line a 12-hole muffin tin
                  with cases. Gently melt the butter, chocolate, sugar and 100ml
                  hot water together in a large saucepan, stirring occasionally,
                  then set aside to cool a little while you weigh the other
                  ingredients.
                </li>
                <li>
                  Stir the eggs and vanilla into the chocolate mixture. Put the
                  flour into a large mixing bowl, then stir in the chocolate
                  mixture until smooth. Spoon into cases until just over
                  three-quarters full (you may have a little mixture leftover),
                  then set aside for 5 mins before putting on a low shelf in the
                  oven and baking for 20-22 mins. Leave to cool.
                </li>
                <li>
                  For the icing, melt the chocolate in a heatproof bowl over a
                  pan of barely simmering water. Once melted, turn off the heat,
                  stir in the double cream and sift in the icing sugar. When
                  spreadable, top each cake with some and decorate with your
                  favourite sprinkles and sweets.
                </li>
              </ol>
            </div>
          </article>
          {/*//two-third*/}
          {/*one-third*/}
          <article className="one-third">
            <dl className="basic">
              <dt>Preparation time</dt>
              <dd>15 mins</dd>
              <dt>Cooking time</dt>
              <dd>30 mins</dd>
              <dt>Difficulty</dt>
              <dd>easy</dd>
              <dt>Serves</dt>
              <dd>4 people</dd>
            </dl>
            <dl className="user">
              <dt>Category</dt>
              <dd>Deserts</dd>
              <dt>Posted by</dt>
              <dd>Jennifer W.</dd>
            </dl>
            <dl className="ingredients">
              <dt>300g</dt>
              <dd>Self-raising flour</dd>
              <dt>200g</dt>
              <dd>Butter</dd>
              <dt>200g</dt>
              <dd>Plain chocolate</dd>
              <dt>2</dt>
              <dd>Eggs</dd>
              <dt>1 tbsp</dt>
              <dd>Vanilla extract</dd>
              <dt>200 g</dt>
              <dd>Brown sugar</dd>
              <dt>100 ml</dt>
              <dd>Double cream</dd>
              <dt>handful</dt>
              <dd>Sprinkles</dd>
            </dl>
          </article>
          {/*//one-third*/}
        </div>
      </div>
      {/*//recipe*/}
      {/*comments*/}
      <div className="comments" id="comments">
        <h2>5 comments </h2>
        <ol className="comment-list">
          {/*comment*/}
          <li className="comment depth-1">
            <div className="avatar">
              <a href="my_profile.html">
                <img src="images/avatar.jpg" alt="" />
              </a>
            </div>
            <div className="comment-box">
              <div className="comment-author meta">
                <strong>Kimberly C.</strong> said 1 month ago{" "}
                <a href="#" className="comment-reply-link">
                  {" "}
                  Reply
                </a>
              </div>
              <div className="comment-text">
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                  nostrud exerci tation.
                </p>
              </div>
            </div>
          </li>
          {/*//comment*/}
          {/*comment*/}
          <li className="comment depth-1">
            <div className="avatar">
              <a href="my_profile.html">
                <img src="images/avatar.jpg" alt="" />
              </a>
            </div>
            <div className="comment-box">
              <div className="comment-author meta">
                <strong>Alex J.</strong> said 1 month ago{" "}
                <a href="#" className="comment-reply-link">
                  {" "}
                  Reply
                </a>
              </div>
              <div className="comment-text">
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                  nostrud exerci tation.
                </p>
              </div>
            </div>
          </li>
          {/*//comment*/}
          {/*comment*/}
          <li className="comment depth-2">
            <div className="avatar">
              <a href="my_profile.html">
                <img src="images/avatar.jpg" alt="" />
              </a>
            </div>
            <div className="comment-box">
              <div className="comment-author meta">
                <strong>Kimberly C.</strong> said 1 month ago{" "}
                <a href="#" className="comment-reply-link">
                  {" "}
                  Reply
                </a>
              </div>
              <div className="comment-text">
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                  nostrud exerci tation.
                </p>
              </div>
            </div>
          </li>
          {/*//comment*/}
          {/*comment*/}
          <li className="comment depth-3">
            <div className="avatar">
              <a href="my_profile.html">
                <img src="images/avatar.jpg" alt="" />
              </a>
            </div>
            <div className="comment-box">
              <div className="comment-author meta">
                <strong>Alex J.</strong> said 1 month ago{" "}
                <a href="#" className="comment-reply-link">
                  {" "}
                  Reply
                </a>
              </div>
              <div className="comment-text">
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                  nostrud exerci tation.
                </p>
              </div>
            </div>
          </li>
          {/*//comment*/}
          {/*comment*/}
          <li className="comment depth-1">
            <div className="avatar">
              <a href="my_profile.html">
                <img src="images/avatar.jpg" alt="" />
              </a>
            </div>
            <div className="comment-box">
              <div className="comment-author meta">
                <strong>Denise M.</strong> said 1 month ago{" "}
                <a href="#" className="comment-reply-link">
                  {" "}
                  Reply
                </a>
              </div>
              <div className="comment-text">
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                  nostrud exerci tation.
                </p>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>
  </div>
</>

    );
}


