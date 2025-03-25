import React, { useEffect, useState } from 'react'
import './css/Profile.css'
import { useParams } from 'react-router-dom'

export default function Profile() {
  const picLink = "https://cdn-icons-png.flaticon.com/128/847/847969.png";
    const { userid } = useParams()
    const [isFollow, setisFollow] = useState(false);
    const [user, setUser] = useState("")
    const [posts, setPosts] = useState([])

// to follow user
const followUser = (userId) => {
    fetch("https://naveen-gj1x.onrender.com/follow", {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        followId: userId
      })
    })
      .then((res) => res.json()) // ✅ return res.json()
      .then((data) => {
        console.log(data); // ✅ you will now get the response data
        // Optionally update UI or state here
        setisFollow(true)
      })
      .catch((err) => {
        console.error("Follow error:", err);
      }); 
  };
  
const unfollowUser = (userId) => {
    fetch("https://naveen-gj1x.onrender.com/unfollow", {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      },
      body: JSON.stringify({
        followId: userId
      })
    })
      .then((res) => res.json()) // ✅ return res.json()
      .then((data) => {
        console.log(data); // ✅ will log the response from the backend
        // Optionally update state or UI here
        setisFollow(false)
      })
      .catch((err) => {
        console.error("Unfollow error:", err);
      });
  };
  


    useEffect(() => {
        fetch(`https://naveen-gj1x.onrender.com/user/${userid}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt')
            }
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                setUser(result.user)
                setPosts(result.posts)
                if (result.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id)){
                    setisFollow(true)
                }
            })
    }, [isFollow,userid])

    return (
        <div className='profile'>
            {/* profile Frame */}
            <div className="profile-frame">
                {/* profile pic */}
                <div className="profile-pic">
                    <img src={user?.photo ? user.photo: picLink} alt="" />
                </div>
                {/* profile data */}
                <div className="profile-data">
                    <div style={{display:"flex",alignItems:'center',justifyContent:"space-between"}}>
                    <h1>{user.name}</h1>
                    <button className='followBtn' onClick={()=>{
                        if(isFollow){unfollowUser(user._id)} else{followUser(user._id)}
                         }}>{isFollow ? "Unfollow" : "Follow"}</button>
                    </div>
                    <div className="profile-info" style={{ display: "flex", gap: "5px" }}>
                        <p>{posts.length} Posts </p>
                        <p>{user.followers?user.followers.length:"0"} Followers</p>
                        <p>{user.following?user.following.length:"0"}Following</p>
                    </div>
                </div>
            </div>
            <hr style={{ width: "90%", opacity: "0.8", margin: "25px auto" }} />
            {/* Gallery */}
            <div className="gallery">
                {posts.map((pics) => {
                    return <img key={pics._id} src={pics.photo}
                          // onClick={() => { toggleDetails(pics) }} 
                        className='item' alt=''></img>
                })}
            </div>
            {/* {show &&
        <PostDetail item={posts} toggleDetails={toggleDetails} />
      } */}
        </div>
    )
}
