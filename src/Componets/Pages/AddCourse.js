import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AddCourse() {
  const [loading, setloading] = useState(false);
  let userID = localStorage.getItem('userID')
  const [User, SetUser] = useState({
    title: "",
    description: "",
    lvlOfDiff: "",
    imageLink: "",
    userID,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    SetUser({ ...User, [name]: value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    SetUser({ ...User, imageLink: file });
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
    formData.append("userID", User.userID);
    try {
      let res = await axios.post("https://hackathondb.cyclic.app/auth/addcourse", formData)
      if (res) {
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
            userID,
          });
        }
        navigate("/courses");
      }
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  };

  return (
    <>
      <Navbar />
      {loading ? <div className="spinner"></div> :
        <div className="flex justify-center">
          <form
            className="w-full md:w-1/2 border p-4"
            style={{ marginTop: 100 }}
            encType="multipart/form-data"
          >
            <div className="form-group ">
              <label className="control-label" htmlFor="title">
                Course Title:
              </label>
              <br />
              <TextField
                sx={{ width: "100%" }}
                type="text"
                className="form-control"
                id="title"
                name="title"
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                placeholder="Enter Course Title"
              />
            </div>
            <br />

            <div className="form-group">
              <label className="control-label" htmlFor="CourseDesc">
                Course Description:
              </label>
              <br />
              <TextField
                sx={{ width: "100%" }}
                type="text"
                className="form-control"
                id="CourseDesc"
                autoComplete="off"
                name="description"
                onChange={(e) => handleChange(e)}
                placeholder="Enter Course Description"
              />
            </div>
            <br />

            <div className="form-group">
              <label className="control-label" htmlFor="lvlOfDiff">
                Course level Of Diffi:
              </label>
              <br />
              <TextField
                sx={{ width: "100%" }}
                type="text"
                className="form-control"
                id="lvlOfDiff"
                autoComplete="off"
                name="lvlOfDiff"
                onChange={(e) => handleChange(e)}
                placeholder="Enter Course lvlOfDiff"
              />
            </div>
            <br />

            <div className="form-group">
              <label className="control-label" htmlFor="imageLink">
                Course Image:
              </label>
              <br />
              <TextField
                sx={{ width: "100%" }}
                type="file"
                accept="image/*"
                name="imageLink"
                className="form-control"
                id="imageLink"
                onChange={handleFileChange}
              />
            </div>
            <br />

            <div className="form-group">
              <Button
                type="button"
                variant="contained"
                className="btn btn-default"
                onClick={handleClick}
              >
                Add Course
              </Button>
            </div>
          </form>
        </div>
      }
      <ToastContainer />
    </>
  );
}
export default AddCourse;
