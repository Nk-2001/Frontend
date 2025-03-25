
// import React, { useEffect, useState } from 'react';
// import './css/Profile.css';
// import PostDetail from './PostDetail';
// import ProfilePic from './ProfilePic';

// export default function Profile() {
//   const picLink = "https://cdn-icons-png.flaticon.com/128/847/847969.png";
//   const [pic, setPic] = useState([]);
//   const [show, setShow] = useState(false);
//   const [user, setUser] = useState('');
//   const [posts, setPosts] = useState([]);
//   const [changePic, setChangePic] = useState(false);

//   const toggleDetails = (postItem) => {
//     setShow(!show);
//     setPosts(postItem);
//   };

//   const changeProfile = () => {
//     setChangePic(prev => !prev);
//   };

//   useEffect(() => {
//     const userId = JSON.parse(localStorage.getItem("user"))?._id;
//     if (!userId) return;

//     fetch(`http://localhost:5000/user/${userId}`, {
//       headers: {
//         Authorization: 'Bearer ' + localStorage.getItem('jwt'),
//       },
//     })
//       .then(res => res.json())
//       .then((result) => {
//         setPic(result.posts || []);
//         setUser(result.user || {});
//       })
//       .catch(err => console.error("Error fetching profile data:", err));
//   }, []);

//   return (
//     <div className='profile'>
//       {/* Profile Frame */}
//       <div className="profile-frame">
//         {/* Profile Pic */}
//         <div className="profile-pic">
//           <img
//             onClick={changeProfile}
//             src={user?.photo ? user.photo: picLink}
//             alt="Profile"
//             style={{ cursor: 'pointer' }}
//           />
//         </div>

//         {/* Profile Data */}
//         <div className="profile-data">
//           <h1>{JSON.parse(localStorage.getItem("user"))?.name}</h1>
//           <div className="profile-info" style={{ display: "flex", gap: "10px" }}>
//             <p>{pic?.length || 0} Posts</p>
//             <p>{user?.followers?.length || 0} Followers</p>
//             <p>{user?.following?.length || 0} Following</p>
//           </div>
//         </div>
//       </div>

//       <hr style={{ width: "90%", opacity: "0.8", margin: "25px auto" }} />

//       {/* Gallery */}
//       <div className="gallery">
//         {pic.map((post) => (
//           <img
//             key={post._id}
//             src={post.photo}
//             alt="User post"
//             className='item'
//             onClick={() => toggleDetails(post)}
//           />
//         ))}
//       </div>

//       {/* Post Detail Modal */}
//       {show && 
//       <PostDetail item={posts} toggleDetails={toggleDetails} />}

//       {/* ProfilePic Modal */}
//       {changePic && 
//       <ProfilePic changeProfile={changeProfile} />}
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import './css/Profile.css';
import PostDetail from './PostDetail';
import ProfilePic from './ProfilePic';

export default function Profile() {
  const picLink = "https://cdn-icons-png.flaticon.com/128/847/847969.png";
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [changePic, setChangePic] = useState(false);

  const toggleDetails = (postItem) => {
    setShow(!show);
    setPosts(postItem);
  };

  const changeProfile = () => {
    setChangePic(prev => !prev);

    // Fetch latest profile data on profile pic change
    const userId = JSON.parse(localStorage.getItem("user"))?._id;
    if (!userId) return;

    fetch(`https://naveen-gj1x.onrender.com/user/${userId}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then(res => res.json())
      .then((result) => {
        setPic(result.posts || []);
        setUser(result.user || {});
        localStorage.setItem("user", JSON.stringify(result.user)); // update localStorage user
      })
      .catch(err => console.error("Error updating profile data:", err));
  };

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))?._id;
    if (!userId) return;

    fetch(`https://naveen-gj1x.onrender.com/user/${userId}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then(res => res.json())
      .then((result) => {
        setPic(result.posts || []);
        setUser(result.user || {});
      })
      .catch(err => console.error("Error fetching profile data:", err));
  }, []);

  return (
    <div className='profile'>
      {/* Profile Frame */}
      <div className="profile-frame">
        {/* Profile Pic */}
        <div className="profile-pic">
          <img
            onClick={changeProfile}
            src={user?.photo ? user.photo : picLink}
            alt="Profile"
            style={{ cursor: 'pointer' }}
          />
        </div>

        {/* Profile Data */}
        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem("user"))?.name}</h1>
          <div className="profile-info" style={{ display: "flex", gap: "10px" }}>
            <p>{pic?.length || 0} Posts</p>
            <p>{user?.followers?.length || 0} Followers</p>
            <p>{user?.following?.length || 0} Following</p>
          </div>
        </div>
      </div>

      <hr style={{ width: "90%", opacity: "0.8", margin: "25px auto" }} />

      {/* Gallery */}
      <div className="gallery">
        {pic.map((post) => (
          <img
            key={post._id}
            src={post.photo}
            alt="User post"
            className='item'
            onClick={() => toggleDetails(post)}
          />
        ))}
      </div>

      {/* Post Detail Modal */}
      {show && <PostDetail item={posts} toggleDetails={toggleDetails} />}

      {/* ProfilePic Modal */}
      {changePic && <ProfilePic changeProfile={changeProfile} />}
    </div>
  );
}

