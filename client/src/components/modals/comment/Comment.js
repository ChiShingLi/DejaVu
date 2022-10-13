import React from 'react'
import { useNavigate } from 'react-router-dom';

import "./Comment.css";
const Comment = ({ commentData }) => {
    const navigate = useNavigate();

    return (
        <div className="commentCard">
            <h1>{commentData && commentData.length} comments</h1>
            {commentData.map(comment => {
                return (
                    <div key={comment.poster} className="commentContainer">
                        <div className="commentDivider">
                            <div className="commenter" onClick={() => { navigate(`/profile/${comment.username}`) }}>
                                {comment.username}:
                            </div>
                            <div className="commentMessage">
                                {comment.message}
                            </div>
                        </div>
                        <hr />
                    </div>
                )
            })}
        </div>
    )
}

export default Comment