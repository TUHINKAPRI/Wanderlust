import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
function Profile() {
  const { currentUser } = useSelector((state) => state.user.user);
  const { username, email } = currentUser.data.data;
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(undefined);
  const [filePer,setFilePer]=useState(null)
  const[fileError,setFileError]=useState(null)
  // console.log(file);
  // console.log(filePer , fileError)
  const fileRef = useRef(null);
  // console.log(currentUser?.data?.data.avatar)
  console.log(formData)

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    let fileName = new Date().getTime() + file.name;
    let storageRef = ref(storage, fileName);
    let uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        setFilePer(Math.round(progress))
        // if(Math.round(progress)===100){
        //   setFilePer(null)
        // }
        // switch (snapshot.state) {
        //   case "paused":
        //     console.log("Upload is paused");
        //     break;
        //   case "running":
        //     console.log("Upload is running");
        //     break;
        //   default:
        // }
      },
      (error) => {
       setFileError(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          setFormData((prev)=>{
            return{
              ...prev,
              avatar:downloadURL
            }
          })
        });
      }
    );
  };
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  function changeHandler(e) {
    setFormData();
  }
  function clickHandler(e) {
    e.preventDefault();
  }
  function deleteHandler() {}
  function signOutHandler() {}
  return (
    <div className=" max-w-lg mx-auto flex flex-col ">
      <h1 className="text-3xl font-semibold text-center my-6">Profile</h1>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        accept="image/*"
        ref={fileRef}
        hidden
      />
      <img
        src={currentUser.data.data.avatar}
        alt="Profile"
        className="self-center rounded-full w-1/6 h-1/6 mb-3"
        onClick={() => fileRef.current.click()}
      />
      <div className="text-center">
      {
      fileError?(<p>Error Image Upload</p>):(
        filePer>0&&filePer<100?(
          <p>Uploading{filePer}%</p>
        ):(filePer===100?(<p>Image Upload Successfull</p>):(""))
      )
     }
      </div>
   
      <form action="" className="flex flex-col  gap-4 ">
        <input
          type="text"
          value={username}
          onChange={changeHandler}
          className="border p-3 rounded-lg focus:outline-none"
        />
        <input
          type="text"
          value={email}
          onChange={changeHandler}
          className="border p-3 rounded-lg focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={changeHandler}
          className="border p-3 rounded-lg focus:outline-none"
        />
        <button
          onClick={clickHandler}
          className="bg-slate-700 text-white p-3 rounded-lg"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-500" onClick={deleteHandler}>
          Delete Account
        </span>
        <span className="text-red-500" onClick={signOutHandler}>
          Sign Out
        </span>
      </div>
    </div>
  );
}

export default Profile;
