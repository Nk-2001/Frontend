
import React, { useState , useEffect} from 'react';
import './css/Createpost.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function Createpost() {
    const [body, setBody] = useState("")
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const navigate = useNavigate()

      //Toast Functions
      const notifyA = (msg) => toast.error(msg)
      const notifyB = (msg) => toast.success(msg)

    useEffect(() => {
// saving post to mongodb after image is uploaded
              if(url){
              fetch("http://localhost:5000/createPost",{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer " + localStorage.getItem("jwt") 
                },
                body:JSON.stringify({
                    body,
                    pic:url
                })
            }).then(res=>res.json())
            .then(data=>{if(data.error){
                notifyA(data.error)
            }else{
                notifyB("Successfully Posted!!")
                navigate('/')
            }})
            .catch(err=>console.log(err))
        }
    }, [url])
    

    //posting images to cloudinary first
    const postDetails = ()=>{
        console.log(body,image);
        const data = new FormData();
        data.append("file",image);
        data.append("upload_preset","insta-clone");
        data.append("cloud_name","naveecloud");
        fetch( "https://api.cloudinary.com/v1_1/naveecloud/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json())
        .then(data=>setUrl(data.url))
        .catch(err=>console.log(err))

    }

    const loadfile = (event) => {
        const selectedImage = event.target.files[0];
        if (selectedImage) {
            var output = document.getElementById('output');
            output.src = URL.createObjectURL(selectedImage);
            output.onload = () => URL.revokeObjectURL(output.src);
            setImage(selectedImage);
        }
    };
    

    return (
        <div className='createpost'>
            <div className="post-header">
                <h4 style={{margin:"3px auto"}}>Create New Post</h4>
                <button id='post-btn' onClick={()=>{postDetails()}}>Share</button>
            </div>

            <div className="main-div">
                <img id='output' src='https://cdn4.iconfinder.com/data/icons/pinpoint-interface-ii/48/image-512.png' alt="preview" />
                <input type="file" accept='image/*' onChange={(event)=>{loadfile(event);setImage(event.target.files[0])}} />
            </div>

            <div className="details">
                <div className="card-header">
                    <div className="card-pic">
                        <img src="https://images.pexels.com/photos/4652070/pexels-photo-4652070.jpeg" alt="" />
                    </div>
                    <h5>Leo Das</h5>
                </div>
                <textarea value={body} onChange={(e) =>{ setBody(e.target.value)} } placeholder='Write a Caption...'></textarea>
            </div>
        </div>
    );
}
