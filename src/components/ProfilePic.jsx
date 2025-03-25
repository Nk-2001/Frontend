import React, { useState, useEffect, useRef ,useCallback } from 'react'

export default function ProfilePic({ changeProfile }) {
    const hiddenFileInput = useRef(null);
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    //posting images to cloudinary first
    const postDetails = useCallback(() => {
      if (!image) {
        console.error("No image selected");
        return;
      }
    
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "naveecloud");
    
      fetch("https://api.cloudinary.com/v1_1/naveecloud/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.url) {
            setUrl(data.url);
          } else {
            console.error("Upload failed:", data);
          }
        })
        .catch((err) => {
          console.error("Cloudinary upload error:", err);
        });
    },[image])

      const postPic = useCallback(() => {
        if (!url) {
          console.error("No image URL available to upload.");
          return;
        }
      
        fetch("https://naveen-gj1x.onrender.com/uploadProfilePic", {
          method: "POST", // ✅ correct method
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            pic: url,
          }),
        })
          .then((res) => res.json()) // ✅ parse response first
          .then((data) => {
            console.log("Response from uploadProfilePic:", data); // ✅ now this will show JSON
      
            if (data.error) {
              console.error("Failed to update profile pic:", data.error);
            } else if (data.user) {
              // ✅ update localStorage
              const storedUser = JSON.parse(localStorage.getItem("user"));
              storedUser.photo = data.user.photo;
              localStorage.setItem("user", JSON.stringify(storedUser));
      
              changeProfile();
              window.location.reload();
            } else {
              console.error("Unexpected response format:", data);
            }
          })
          .catch((err) => {
            console.error("Error updating profile picture:", err);
          });
      },[url,changeProfile])
      
      

    // const postPic = () => {
    //     if (!url) {
    //       console.error("No image URL available to upload.");
    //       return;
    //     }
      
    //     fetch("http://localhost:5000/uploadProfilePic", {
    //       method: "Post",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + localStorage.getItem("jwt"),
    //       },
    //       body: JSON.stringify({
    //         pic: url,
    //       }),
    //     })
        
      //     .then((res) => res.json())
      //     .then((data) => {
      //       if (data.error) {
      //         console.error("Failed to update profile pic:", data.error);
      //       } else {
      //         console.log("Profile picture updated successfully:", data);
      //         // You can optionally update user state here if needed
      //         changeProfile();
      //         window.location.reload();
      //       }
      //     })
      //     .catch((err) => {
      //       console.error("Error updating profile picture:", err);
      //     });
      // };

      


    const handleClick = () => {
        hiddenFileInput.current.click()
    };
    useEffect(() => {
      if (image) {
          postDetails();
      }
  }, [image, postDetails]);
  
  useEffect(() => {
      if (url) {
          postPic();
      }
  }, [url, postPic]);



    return (
        <div className='profilepic darkBg'>
            <div className="changePic centered">
                <div>
                    <h2>change Profile Photo</h2>
                </div>
                <div style={{ borderTop: "1px solid #00000030" }}>
                    <button className='upload-btn' style={{ color: "#1EA1F7" }} onClick={handleClick}>Upload Photo</button>
                    <input type="file" ref={hiddenFileInput} accept='image/*' style={{ display: "none" }} onChange={(e) => { setImage(e.target.files[0]) }} />
                </div>
                <div style={{ borderTop: "1px solid #00000030" }}>
                    <button className='upload-btn' style={{ color: "#ED4956" }}>Remove Current Photo</button>
                </div>
                <div style={{ borderTop: "1px solid #00000030" }}>
                    <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "15px" }} onClick={changeProfile}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
