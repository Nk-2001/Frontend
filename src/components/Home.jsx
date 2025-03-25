
// // import React, { useEffect, useState } from 'react';
// // import './Home.css';
// // import { useNavigate, Link } from 'react-router-dom';
// // import { toast } from 'react-toastify';


// // export default function Home() {
// //   const picLink = "https://cdn-icons-png.flaticon.com/128/847/847969.png";
// //   const navigate = useNavigate();
// //   const [data, setData] = useState([]);
// //   const [userId, setUserId] = useState("");
// //   const [commentMap, setCommentMap] = useState({});
// //   const [show, setShow] = useState(false);
// //   const [demo, setDemo] = useState({});

// //   console.log(commentMap)
// //   // Toast Functions
// //   const notifyA = (msg) => toast.error(msg);
// //   const notifyB = (msg) => toast.success(msg);

// //   useEffect(() => {
// //     const token = localStorage.getItem("jwt");
// //     if (!token) {
// //       navigate('/signup');
// //       return;
// //     }

// //     const user = JSON.parse(localStorage.getItem("user"));
// //     setUserId(user?._id || "");

// //     fetch("http://localhost:5000/allposts", {
// //       headers: {
// //         Authorization: "Bearer " + token
// //       },
// //     })
// //       .then(res => res.json())
// //       .then(result => setData(result.posts))
// //       .catch(err => console.log(err));
// //   }, []);

// //   // const toggleComment = (item = null) => {
// //   //   setShow(prev => !prev);
// //   //   if (item) setDemo(item);
// //   // };
// //   const toggleComment=(item)=>{
// //     if (show){
// //       setShow(false);
// //     }else{
// //       setShow(true)
// //       setDemo(item)
// //     }
// //   }

// //   const likePost = (id) => {
// //     fetch("http://localhost:5000/like", {
// //       method: "PUT",
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: "Bearer " + localStorage.getItem("jwt")
// //       },
// //       body: JSON.stringify({ postId: id })
// //     })
// //       .then(res => res.json())
// //       .then(updatedPost => {
// //         const newData = data.map(item => item._id === updatedPost._id ? updatedPost : item);
// //         setData(newData);
// //         if (demo._id === updatedPost._id) setDemo(updatedPost);
// //       })
// //       .catch(err => console.log(err));
// //   };

// //   const unlikePost = (id) => {
// //     fetch("http://localhost:5000/unlike", {
// //       method: "PUT",
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: "Bearer " + localStorage.getItem("jwt")
// //       },
// //       body: JSON.stringify({ postId: id })
// //     })
// //       .then(res => res.json())
// //       .then(updatedPost => {
// //         const newData = data.map(item => item._id === updatedPost._id ? updatedPost : item);
// //         setData(newData);
// //         if (demo._id === updatedPost._id) setDemo(updatedPost);
// //       })
// //       .catch(err => console.log(err));
// //   };

// // // function to make comment
// //   const makeComment = (text, id) => {
// //     if (!text?.trim()) return notifyA("Comment cannot be empty");

// //     fetch("http://localhost:5000/comment", {
// //       method: "PUT",
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: "Bearer " + localStorage.getItem("jwt")
// //       },
// //       body: JSON.stringify({ text:text, postId: id })
// //     })
// //       .then(res => res.json())
// //       .then(result => {
// //         const newData = data.map((item)=>{
// //           if (item._id == result.id){
// //             return result;
// //           }else{
// //             return item;
// //           }
// //         });
// //         setData(newData);
// //         setCommentMap('')
// //         // setCommentMap(prev => ({ ...prev, [id]: '' }));
// //         notifyB("Comment Posted");
// //         // if (demo._id === result._id) setDemo(result);
// //       })
// //       .catch(err => console.error(err));
// //   };

// //   return (
// //     <div className='home'>
// //       {data.map((item, index) => (
// //         <div className="card" key={index}>
// //           {/* Card Header */}
// //           <div className="card-header">
// //             <div className="card-pic">
// //               <img src={item.postedBy.photo || picLink} alt="user" />
// //             </div>
// //             <h5>
// //               <Link to={`/profile/${item.postedBy._id}`}>
// //                 {item.postedBy?.name || 'user'}
// //               </Link>
// //             </h5>
// //           </div>

// //           {/* Card Image */}
// //           <div className="card-image">
// //             <img src={item.photo} alt="post" className='card-image' />
// //           </div>

// //           {/* Card Content */}
// //           <div className="card-content">
// //             {item.likes.includes(userId) ? (
// //               <span className="material-symbols-outlined material-symbols-outlined-red" onClick={() => unlikePost(item._id)} title="Unlike">
// //                 favorite
// //               </span>
// //             ) : (
// //               <span className="material-symbols-outlined favourite-icon" onClick={() => likePost(item._id)} title="Like">
// //                 favorite
// //               </span>
// //             )}
// //             <p>{item.likes?.length || 0} Likes</p>
// //             <p>{item.body}</p>
// //             <p style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => toggleComment(item)}>
// //               View all comments
// //             </p>
// //           </div>

// //           {/* Comment Input */}
// //           <div className="add-comment">
// //             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-smile" viewBox="0 0 16 16">
// //               <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
// //               <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
// //             </svg>
// //             <input
// //               type="text"
// //               placeholder="Add a Comment"
// //               value={commentMap[item._id] || ''}
// //               onChange={(e) => setCommentMap({ ...commentMap, [item._id]: e.target.value })}
// //             />
// //             <button className='comment' onClick={() => makeComment(commentMap[item._id], item._id)}>Post</button>
// //           </div>
// //         </div>
// //       ))}

// //       {/* Show Comment Modal */}
// //       {show && (
// //         <div className="showComment">
// //           <div className="container">
// //             <div className="postPic">
// //               <img src={demo.photo} alt="post" />
// //             </div>
// //             <div className="details">
// //               {/* Card Header */}
// //               <div className="card-header" style={{ borderBottom: "1px solid #00000029" }}>
// //                 <div className="card-pic">
// //                   <img src={demo.postedBy?.photo || picLink} alt="user" />
// //                 </div>
// //                 <h5>{demo.postedBy?.name}</h5>
// //               </div>

// //               {/* Comment Section */}
// //               <div className="comment-section" style={{ borderBottom: "1px solid #00000029" }}>
// //                 {demo?.comments?.map((comment, index) => (
// //                   <p className="comm" key={index}>
// //                     <span className="commenter" style={{ fontWeight: "bold", marginRight: "5px" }}>
// //                       {comment?.postedBy?.name || 'user'}:
// //                     </span>
// //                     <span className="commentText">{comment.comment}</span>
// //                   </p>
// //                 ))}
// //               </div>

// //               {/* Likes & Body */}
// //               <div className="card-content">
// //                 <p>{demo.likes?.length || 0} Likes</p>
// //                 <p>{demo.body}</p>
// //               </div>

// //               {/* Add Comment in Modal */}
// //               <div className="add-comment">
// //                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-smile" viewBox="0 0 16 16">
// //                   <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
// //                   <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
// //                 </svg>
// //                 <input
// //                   type="text"
// //                   placeholder="Add a Comment"
// //                   value={commentMap[demo._id] || ''}
// //                   onChange={(e) => setCommentMap({ ...commentMap, [demo._id]: e.target.value })}
// //                 />
// //                 <button className="comment" onClick={() => makeComment(commentMap[demo._id], demo._id)}>Post</button>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="close-comment" onClick={toggleComment}>
// //             <span className="material-symbols-outlined material-symbols-outlined-comment">close</span>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }




// import React, { useEffect, useState } from 'react';
// import './Home.css';
// import { useNavigate, Link } from 'react-router-dom';
// import { toast } from 'react-toastify';

// export default function Home() {
//   const picLink = "https://cdn-icons-png.flaticon.com/128/847/847969.png";
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [userId, setUserId] = useState("");
//   const [commentMap, setCommentMap] = useState({});
//   const [show, setShow] = useState(false);
//   const [demo, setDemo] = useState({});

//   // Toast messages
//   const notifyA = (msg) => toast.error(msg);
//   const notifyB = (msg) => toast.success(msg);

//   useEffect(() => {
//     const token = localStorage.getItem("jwt");
//     if (!token) {
//       navigate('/signup');
//       return;
//     }

//     const user = JSON.parse(localStorage.getItem("user"));
//     setUserId(user?._id || "");

//     fetch("http://localhost:5000/allposts", {
//       headers: { Authorization: "Bearer " + token }
//     })
//       .then(res => res.json())
//       .then(result => setData(result.posts))
//       .catch(err => console.error(err));
//   }, []);

//   const toggleComment = (item) => {
//     setShow(!show);
//     setDemo(item || {});
//   };

//   const likePost = (id) => {
//     fetch("http://localhost:5000/like", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + localStorage.getItem("jwt")
//       },
//       body: JSON.stringify({ postId: id })
//     })
//       .then(res => res.json())
//       .then(updatedPost => {
//         const newData = data.map(item => item._id === updatedPost._id ? updatedPost : item);
//         setData(newData);
//         if (demo._id === updatedPost._id) setDemo(updatedPost);
//       })
//       .catch(err => console.error(err));
//   };

//   const unlikePost = (id) => {
//     fetch("http://localhost:5000/unlike", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + localStorage.getItem("jwt")
//       },
//       body: JSON.stringify({ postId: id })
//     })
//       .then(res => res.json())
//       .then(updatedPost => {
//         const newData = data.map(item => item._id === updatedPost._id ? updatedPost : item);
//         setData(newData);
//         if (demo._id === updatedPost._id) setDemo(updatedPost);
//       })
//       .catch(err => console.error(err));
//   };

//   // const makeComment = (text, id) => {
//   //   if (!text?.trim()) return notifyA("Comment cannot be empty");

//   //   fetch("http://localhost:5000/comment", {
//   //     method: "PUT",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //       Authorization: "Bearer " + localStorage.getItem("jwt")
//   //     },
//   //     body: JSON.stringify({ text, postId: id })
//   //   })
//   //     .then(res => res.json())
//   //     .then(result => {
//   //       const newData = data.map(item => item._id === result._id ? result : item);
//   //       setData(newData);
//   //       setCommentMap(prev => ({ ...prev, [id]: '' }));
//   //       if (demo._id === result._id) setDemo(result);
//   //       notifyB("Comment Posted");
//   //     })
//   //     .catch(err => console.error(err));
//   // };

//   // UPDATED makeComment function
//   // const makeComment = (e, postId) => {
//   //   // e.preventDefault(); // Prevent form reload
//   //   const commentText = commentMap[postId];

//   //   if (!commentText || !commentText.trim()) {
//   //     return notifyA("Comment cannot be empty");
//   //   }

//   //   fetch("http://localhost:5000/comment", {
//   //     method: "PUT",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //       Authorization: "Bearer " + localStorage.getItem("jwt")
//   //     },
//   //     body: JSON.stringify({ text: commentText.trim(), postId })
//   //   })
//   //     .then(async (res) => {
//   //       if (!res.ok) {
//   //         const err = await res.json();
//   //         throw new Error(err.error || "Server Error");
//   //       }
//   //       return res.json();
//   //     })
//   //     .then(result => {
//   //       const newData = data.map(item => item._id === result._id ? result : item);
//   //       setData(newData);
//   //       setCommentMap(prev => ({ ...prev, [postId]: "" }));
//   //       if (demo._id === result._id) setDemo(result);
//   //       notifyB("Comment Posted");
//   //     })
//   //     .catch(err => {
//   //       console.error("Error posting comment:", err.message);
//   //       notifyA(err.message || "Something went wrong");
//   //     });
//   //   }

//   const makeComment = (text, id) => {
//     if (!text?.trim()) return notifyA("Comment cannot be empty");
  
//     fetch("http://localhost:5000/comment", {
//       method: "POST", // Changed to POST
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + localStorage.getItem("jwt"),
//       },
//       body: JSON.stringify({ text, postId: id }),
//     })
//       .then(res => res.json())
//       .then(result => {
//         const newData = data.map(item =>
//           item._id === result._id ? result : item
//         );
//         setData(newData);
//         setCommentMap(prev => ({ ...prev, [id]: '' }));
  
//         if (demo._id === result._id) {
//           setDemo(result);
//         }
  
//         notifyB("Comment Posted");
//       })
//       .catch(err => console.error(err));
//   };  


//     return (
//       <div className='home'>
//         {data.map((item, index) => (
//           <div className="card" key={index}>
//             {/* Card Header */}
//             <div className="card-header">
//               <div className="card-pic">
//                 <img src={item.postedBy?.photo || picLink} alt="user" />
//               </div>
//               <h5>
//                 <Link to={`/profile/${item.postedBy._id}`}>
//                   {item.postedBy?.name || 'user'}
//                 </Link>
//               </h5>
//             </div>

//             {/* Card Image */}
//             <div className="card-image">
//               <img src={item.photo} alt="post" className="card-image" />
//             </div>

//             {/* Card Content */}
//             <div className="card-content">
//               {item.likes.includes(userId) ? (
//                 <span className="material-symbols-outlined material-symbols-outlined-red" onClick={() => unlikePost(item._id)} title="Unlike">
//                   favorite
//                 </span>
//               ) : (
//                 <span className="material-symbols-outlined favourite-icon" onClick={() => likePost(item._id)} title="Like">
//                   favorite
//                 </span>
//               )}
//               <p>{item.likes?.length || 0} Likes</p>
//               <p>{item.body}</p>
//               <p style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => toggleComment(item)}>
//                 View all comments
//               </p>
//             </div>

//             {/* Add Comment Box */}
//             <div className="add-comment">
//               {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-smile" viewBox="0 0 16 16">
//               <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
//               <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
//             </svg>
//             <input
//               type="text"
//               placeholder="Add a Comment"
//               value={commentMap[item._id] || ''}
//               onChange={(e) => setCommentMap({ ...commentMap, [item._id]: e.target.value })}
//             /> */}
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-smile" viewBox="0 0 16 16">
//                 <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
//                 <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
//               </svg>
//               <input
//                 type="text"
//                 placeholder="Add a Comment"
//                 value={commentMap[item._id] || ""}
//                 onChange={(e) => setCommentMap(prev => ({ ...prev, [item._id]: e.target.value }))}
//               />
//               <button className="comment" onClick={() => makeComment(commentMap[item._id], item._id)}>Post</button>
//             </div>
//           </div>
//         ))}

//         {/* Comment Modal */}
//         {show && (
//           <div className="showComment">
//             <div className="container">
//               <div className="postPic">
//                 <img src={demo.photo} alt="post" />
//               </div>
//               <div className="details">
//                 <div className="card-header" style={{ borderBottom: "1px solid #00000029" }}>
//                   <div className="card-pic">
//                     <img src={demo.postedBy?.photo || picLink} alt="user" />
//                   </div>
//                   <h5>{demo.postedBy?.name}</h5>
//                 </div>

//                 <div className="comment-section" style={{ borderBottom: "1px solid #00000029" }}>
//                   {demo?.comments?.map((comment, index) => (
//                     <p className="comm" key={index}>
//                       <span className="commenter" style={{ fontWeight: "bold", marginRight: "5px" }}>
//                         {comment?.postedBy?.name || 'user'}:
//                       </span>
//                       <span className="commentText">{comment.comment}</span>
//                     </p>
//                   ))}
//                 </div>

//                 <div className="card-content">
//                   <p>{demo.likes?.length || 0} Likes</p>
//                   <p>{demo.body}</p>
//                 </div>

//                 <div className="add-comment">
//                   {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-smile" viewBox="0 0 16 16">
//                   <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
//                   <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
//                 </svg>
//                 <input
//                   type="text"
//                   placeholder="Add a Comment"
//                   value={commentMap[demo._id] || ''}
//                   onChange={(e) => setCommentMap({ ...commentMap, [demo._id]: e.target.value })}
//                 /> */}

//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-smile" viewBox="0 0 16 16">
//                     <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
//                     <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
//                   </svg>
//                   <input
//                     type="text"
//                     placeholder="Add a Comment"
//                     value={commentMap[demo._id] || ""}
//                     onChange={(e) => setCommentMap(prev => ({ ...prev, [demo._id]: e.target.value }))}
//                   />
//                   <button className="comment" onClick={() => makeComment(commentMap[demo._id], demo._id)}>Post</button>
//                 </div>
//               </div>
//             </div>

//             <div className="close-comment" onClick={toggleComment}>
//               <span className="material-symbols-outlined material-symbols-outlined-comment">close</span>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }



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



