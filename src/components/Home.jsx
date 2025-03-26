
import React, { useEffect, useState } from 'react';
import './css/Home.css';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Home() {
  const picLink = "https://cdn-icons-png.flaticon.com/128/847/847969.png";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");
  const [commentMap, setCommentMap] = useState({});
  const [show, setShow] = useState(false);
  const [demo, setDemo] = useState({});

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate('/signup');
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    setUserId(user?._id || "");

    fetch("https://naveen-gj1x.onrender.com/allposts", {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => res.json())
      .then(result => setData(result.posts))
      .catch(err => console.error(err));
  }, [navigate]);

  const toggleComment = (item) => {
    setShow(!show);
    setDemo(item || {});
  };

  const likePost = (id) => {
    fetch("https://naveen-gj1x.onrender.com/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({ postId: id })
    })
      .then(res => res.json())
      .then(updatedPost => {
        const newData = data.map(item => item._id === updatedPost._id ? updatedPost : item);
        setData(newData);
        if (demo._id === updatedPost._id) setDemo(updatedPost);
      })
      .catch(err => console.error(err));
  };

  const unlikePost = (id) => {
    fetch("https://naveen-gj1x.onrender.com/unlike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({ postId: id })
    })
      .then(res => res.json())
      .then(updatedPost => {
        const newData = data.map(item => item._id === updatedPost._id ? updatedPost : item);
        setData(newData);
        if (demo._id === updatedPost._id) setDemo(updatedPost);
      })
      .catch(err => console.error(err));
  };

  const makeComment = (text, id) => {
    if (!text?.trim()) return notifyA("Comment cannot be empty");

    fetch("https://naveen-gj1x.onrender.com/comment", {
      method: "POST", // Use POST
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({ text, postId: id })
    })
      .then(res => res.json())
      .then(result => {
        const newData = data.map(item => item._id === result._id ? result : item);
        setData(newData);
        setCommentMap(prev => ({ ...prev, [id]: "" }));
        if (demo._id === result._id) setDemo(result);
        notifyB("Comment Posted");
      })
      .catch(err => {
        console.error("Comment Error:", err);
        notifyA("Failed to post comment");
      });
  };

  return (
    <div className='home'>
      {data.map((item) => (
        <div className="card" key={item._id}>
          {/* Card Header */}
          <div className="card-header">
            <div className="card-pic">
              <img src={item.postedBy?.photo || picLink} alt="user" />
            </div>
            <h5>
              <Link to={`/profile/${item.postedBy._id}`}>
                {item.postedBy?.name || 'User'}
              </Link>
            </h5>
          </div>

          {/* Card Image */}
          <div className="card-image">
            <img src={item.photo} alt="post" />
          </div>

          {/* Card Content */}
          <div className="card-content">
            {item.likes.includes(userId) ? (
              <span className="material-symbols-outlined material-symbols-outlined-red"
                onClick={() => unlikePost(item._id)} title="Unlike">
                favorite
              </span>
            ) : (
              <span className="material-symbols-outlined favourite-icon"
                onClick={() => likePost(item._id)} title="Like">
                favorite
              </span>
            )}
            <p>{item.likes.length} Likes</p>
            <p>{item.body}</p>
            <p style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => toggleComment(item)}>
              View all comments
            </p>
          </div>

          {/* Add Comment Input */}
          <div className="add-comment">
            <input
              type="text"
              placeholder="Add a Comment"
              value={commentMap[item._id] || ''}
              onChange={(e) => setCommentMap({ ...commentMap, [item._id]: e.target.value })}
            />
            <button className='comment' onClick={() => makeComment(commentMap[item._id], item._id)} style={{background:"none"}}>Post</button>
          </div>
        </div>
      ))}

      {/* Comment Modal View */}
      {show && (
        <div className="showComment">
          <div className="container">
            <div className="postPic">
              <img src={demo.photo} alt="post" />
            </div>
            <div className="details">
              {/* Modal Header */}
              <div className="card-header">
                <div className="card-pic">
                  <img src={demo.postedBy?.photo || picLink} alt="user" />
                </div>
                <h5>{demo.postedBy?.name}</h5>
              </div>

              {/* Modal Comment Section */}
              <div className="comment-section">
                {demo.comments?.map((comment, i) => (
                  <p key={i} className="comm">
                    <span className="commenter" style={{ fontWeight: "bold", marginRight: "5px" }}>
                      {comment?.postedBy?.name || 'user'}:
                    </span>
                    <span className="commentText">{comment.comment}</span>
                  </p>
                ))}
              </div>

              {/* Modal Content */}
              <div className="card-content">
                <p>{demo.likes?.length} Likes</p>
                <p>{demo.body}</p>
              </div>

              {/* Add Comment in Modal */}
              <div className="add-comment">
                <input
                  type="text"
                  placeholder="Add a Comment"
                  value={commentMap[demo._id] || ''}
                  onChange={(e) => setCommentMap({ ...commentMap, [demo._id]: e.target.value })}
                />
                <button className="comment" onClick={() => makeComment(commentMap[demo._id], demo._id)} style={{background:"none"}}>Post</button>
              </div>
            </div>
          </div>

          <div className="close-comment" onClick={toggleComment}>
            <span className="material-symbols-outlined">close</span>
          </div>
        </div>
      )}
    </div>
  );
}



