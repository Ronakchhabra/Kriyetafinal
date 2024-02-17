import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AddCourse() {
  const [loading,setloading]  = useState(false);
  const [User, SetUser] = useState({
    title: "",
    description: "",
    lvlOfDiff: "",
    imageLink: "",
    videoLink: "",
    published: true,
    userID: "852531531",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    SetUser({ ...User, [name]: value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    SetUser({ ...User, imageLink: file });
  };
  const handleFileChangeVideo = (e) => {
    const file = e.target.files[0];
    SetUser({ ...User, videoLink: file });
  };
  const navigate = useNavigate();

  const handleClick = async () => {
    setloading(true);
    console.log(User);
    const formData = new FormData();
    formData.append("title", User.title);
    formData.append("description", User.description);
    formData.append("lvlOfDiff", User.lvlOfDiff);
    formData.append("coursestartdate", User.coursestartdate);
    if (User.imageLink instanceof File) {
      formData.append("imageLink", User.imageLink);
    }
    if (User.videoLink instanceof File) {
      formData.append("videoLink", User.videoLink);
    }
    formData.append("published", User.published);
    formData.append("published", User.userID);
    try{
    let res = await axios.post("https://hackathondb.cyclic.app/auth/addcourse", formData)
      if(res){
        setloading(false);
        toast.success(res.data.message);
        console.log(res.data);
        if (res.data.success) {
          SetUser({
            title: "",
            description: "",
            lvlOfDiff: "",
            coursestartdate: "",
            imageLink: "",
            videoLink: "",
            published: true,
            userID: "852531531",
          });
        }
        navigate("/courses");
        }
      }catch(err){
        console.log(err);
        setloading(false);
      }
    };
  return (
    <>
      <Navbar />
      {loading ? <div className="spinner"></div>:
      <form
        className="form-horizontal"
        style={{ marginTop: 100, marginLeft: 20 }}
        encType="multipart/form-data"
      >
        <div className="form-group">
          <label className="control-label col-sm-2" htmlFor="title">
            Course Title:
          </label>
          <br />
          <div className="col-sm-10">
            <TextField
              sx={{ width: "40%" }}
              type="text"
              className="form-control"
              id="title"
              name="title"
              autoComplete="off"
              onChange={(e) => handleChange(e)}
              placeholder="Enter Course Title"
            />
          </div>
        </div>
        <br />

        <div className="form-group">
          <label className="control-label col-sm-2" htmlFor="CourseDesc">
            Course Description:
          </label>
          <br />
          <div className="col-sm-10">
            <TextField
              sx={{ width: "40%" }}
              type="text"
              className="form-control"
              id="CourseDesc"
              autoComplete="off"
              name="description"
              onChange={(e) => handleChange(e)}
              placeholder="Enter Course Description"
            />
          </div>
        </div>
        <br />

        <div className="form-group">
          <label className="control-label col-sm-2" htmlFor="lvlOfDiff">
            Course level Of Diffi:
          </label>
          <br />
          <div className="col-sm-10">
            <TextField
              sx={{ width: "40%" }}
              type="text"
              className="form-control"
              id="lvlOfDiff"
              autoComplete="off"
              name="lvlOfDiff"
              onChange={(e) => handleChange(e)}
              placeholder="Enter Course lvlOfDiff"
            />
          </div>
        </div>
        <br />

        <div className="form-group">
          <label className="control-label col-sm-2" htmlFor="imageLink">
            Course Image:
          </label>
          <br />
          <div className="col-sm-10">
            <TextField
              sx={{ width: "40%" }}
              type="file"
              accept="image/*"
              name="imageLink"
              className="form-control"
              id="imageLink"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <br />

        <div className="form-group">
          <label className="control-label col-sm-2">Course Video:</label>
          <div className="col-sm-10">
            <TextField
              sx={{ width: "40%" }}
              type="file"
              name="videoLink"
              accept="video/*"
              onChange={(e) => handleFileChangeVideo(e)}
              className="form-control"
            />
          </div>
        </div>
        <br />

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <Button
              type="button"
              variant="contained"
              className="btn btn-default"
              onClick={handleClick}
            >
              Add Course
            </Button>
          </div>
        </div>
      </form>
      }
      <ToastContainer/>
    </>
  );
}
export default AddCourse;
