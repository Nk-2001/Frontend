
import React, { useEffect, useState } from 'react';
import './css/Home.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


export default function MyFollowingPost() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");
  const [comment, setComment] = useState("")
  const [show, setShow] = useState(false)
  const [demo, setDemo] = useState([])

    //Toast Functions
    const notifyB = (msg) => toast.success(msg)


  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate('/signup');
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    setUserId(user?._id || "");

    // Fetch all posts
    fetch("https://naveen-gj1x.onrender.com/myfollowingpost", {
      headers: {
        Authorization: "Bearer " + token
      },
    })
      .then(res => res.json())
      .then(result => {
        console.log(result.posts);
        setData(result.posts);
      })
      .catch(err => console.log(err));
  }, [navigate]);

  // to show and hide comments
  const toggleComment = (item) => {
    if (show) {
      setShow(false)
    } else {
      setShow(true)
      setDemo(item)
    }
  }

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
        // Update local state with updated post
        const newData = data.map(item => item._id === updatedPost._id ? updatedPost : item);
        setData(newData);
      })
      .catch(err => console.log(err));
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
      })
      .catch(err => console.log(err));
  };

  //Function to make comment
  const makeComment = (text, id) => {
    fetch("https://naveen-gj1x.onrender.com/comment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        text: text,
        postId: id
      })
    })
    .then((res) => res.json())
    .then((result) => {
      const newData = data.map((item) => {
        if (item._id === result._id) {
          return result;
        } else {
          return item;
        }
      });
      setData(newData);
      setComment("");
      notifyB("Comment posted");
      console.log(result);
    });
};

  return (
    <div className='home'>
      {
        data.map((item, index) => (
          <div className="card" key={index}>
            {/* Card Header */}
            <div className="card-header">
              <div className="card-pic">
                <img src="https://images.pexels.com/photos/4652070/pexels-photo-4652070.jpeg?auto=compress&cs=tinysrgb&w=800" alt="user" />
              </div>
              <h5>
                <Link to={`/profile/${item.postedBy._id}`}>
                {item.postedBy?.name || 'user'}
                </Link></h5>
            </div>

            {/* Card Image */}
            <div className="card-image">
              <img src={item.photo} alt="post" className='card-image' />
            </div>

            {/* Card Content */}
            <div className="card-content">
              {
                item.likes.includes(userId) ? (
                  <span
                    className="material-symbols-outlined material-symbols-outlined-red"
                    onClick={() => unlikePost(item._id)}
                    title="Unlike"
                  >
                    favorite
                  </span>
                ) : (
                  <span
                    className="material-symbols-outlined favourite-icon"
                    onClick={() => likePost(item._id)}
                    title="Like"
                  >
                    favorite
                  </span>
                )
              }
              <p>{item.likes?.length || 0} Likes</p>
              <p>{item.body}</p>
              <p style={{ fontWeight: "bold", cursor: "pointer" }} 
              onClick={() => { toggleComment(item) }}
              >View all comments</p>
            </div>

            {/* Comment Section */}
            <div className="add-comment">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-smile" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
              </svg>
              <input type="text" placeholder='Add a Comment' value={comment} onChange={(e) => { setComment(e.target.value) }} />
              <button className='comment' 
              onClick={() => { makeComment(comment, item._id) }}
              >Post</button>
            </div>
          </div>
        ))
      }
      {/* //Show Comment */}
      {show && (
        <div className="showComment">
          <div className="container">
            <div className="postPic">
              <img src={demo.photo} alt="" />
            </div>
            <div className="details">
              {/* card Deatils */}
              <div className="card-header" style={{ borderBottom: "1px solid #00000029" }}>
                <div className="card-pic">
                  <img src="https://images.pexels.com/photos/4652070/pexels-photo-4652070.jpeg?auto=compress&cs=tinysrgb&w=800" alt="user" />
                </div>
                <h5>{demo.postedBy.name}</h5>
              </div>
              {/* commentSection */}

              <div className="comment-section" style={{ borderBottom: "1px solid #00000029" }}>
                {demo?.comments?.map((comments, index) => (
                  <p className="comm" key={index}>
                    <span className="commenter" style={{ fontWeight: "bold", marginRight: "5px" }}>
                      {comments.postedBy.name}{""}
                    </span>
                    <span className="commentText">{comments.comment}</span>
                  </p>
                ))}
              </div>


              <div className="card-content">
                <p>{demo.likes.length} Likes</p>
                <p>{demo.body}</p>
              </div>

              <div className="add-comment">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-smile" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
                </svg>
                <input type="text" placeholder='Add a Comment' value={comment} onChange={(e) => { setComment(e.target.value) }} />
                <button className='comment'
                 onClick={()=>{
                  makeComment(comment,demo._id);
                  toggleComment();
                }}
                >Post</button>
              </div>


            </div>
          </div>
          <div className="close-comment" 
          onClick={() => { toggleComment() }}
          >
            <span className="material-symbols-outlined material-symbols-outlined-comment">close</span>
          </div>
        </div>)
      }

    </div>
  );
}


