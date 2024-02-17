import React, { useState } from "react";
import VideoCard from "./VideoCard"; // Import the VideoCard component
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import AddBox from "@mui/icons-material/AddBox";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import NotFound from "./NotFound";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Video = ({selectedCourse}) => {
  const navigate = useNavigate();
  const videoTitle = "Introduction to Programming";
  const videoUrl = "https://www.youtube.com/embed/your_video_id";
  const [open, setOpen] = React.useState(false);
  const [isloading, setisloading] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let UserID = localStorage.getItem('userID')
  const [courses,setCourses] = useState([]);
  React.useEffect(() => {
    const getData = async () => {
      try {
        let res = await axios
          .get("https://hackathondb.cyclic.app/auth/getVideo/"+UserID);
        if (res.data) { setCourses(res.data.data); setisloading(false); }
      }
      catch (err) {
        setisloading(false);
      }
    }
    getData();
  }, []);

  const [Form, setForm] = useState({
    UserID,
    VideoLink: "",
    VideoTitle: "",
    VideoDesc: "",
    CourseID: selectedCourse._id,
  });
  const HandleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...Form, [name]: value });
  };
  const handleFileChangeVideo = (e) => {
    const file = e.target.files[0];
    setForm({ ...Form, VideoLink: file });
  };
  const handleClick = async () => {
    setisloading(true);
    const formData = new FormData();
    formData.append("UserID", Form.UserID);
    formData.append("VideoTitle", Form.VideoTitle);
    formData.append("VideoDesc", Form.VideoDesc);
    if (Form.VideoLink instanceof File) {
      formData.append("VideoLink", Form.VideoLink);
    }
    formData.append("CourseID", Form.CourseID);
    try {
      let res = await axios.post(
        "https://hackathondb.cyclic.app/auth/addVideo",
        formData
      );
      if (res) {
        // toast.success(res.data.message);
        setisloading(false);
        handleClose();
        console.log(res.data);
        if (res.data.success) {
          setForm({
            UserID,
            VideoLink: "",
            VideoTitle: "",
            VideoDesc: "",
            CourseID: "",
          });
        }
        // navigate("/courses");
      }
    } catch (err) {
      handleClose();
      setisloading(false);
      console.log(err);
    }
  };
  return (
    <>
      <Sidebar />
      <Box component="main" sx={{ ml: 40, mt: 15 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "end",
            mr: 2,
          }}
        >
          <Button
            startIcon={<AddBox />}
            variant="contained"
            onClick={handleOpen}
          >
            Add Video
          </Button>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {isloading ? (
            <div className="spinner" />
          ) : (
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ textAlign: "center" }}
              >
                Add Video
              </Typography>
              <TextField
                id="standard-basic"
                label="Title"
                sx={{ width: "100%" }}
                variant="standard"
                name="VideoTitle"
                onChange={HandleChange}
                value={Form.VideoTitle}
              />
              <TextField
                id="standard-basic"
                label="Description"
                variant="standard"
                sx={{ width: "100%" }}
                name="VideoDesc"
                onChange={HandleChange}
                value={Form.VideoDesc}
              />
              <TextField
                sx={{ width: "100%" }}
                type="file"
                name="VideoLink"
                accept="video/*"
                onChange={(e) => handleFileChangeVideo(e)}
                className="form-control"
              />
              <Button
                variant="contained"
                sx={{ display: "block", mt: 2, width: "100%" }}
                onClick={handleClick}
              >
                Upload
              </Button>
            </Box>
          )}
        </Modal>
        <Box sx={{ display: "flex", mt: 2, mr:2,width: "100%" }}>
          <VideoCard videoTitle={videoTitle} videoUrl={videoUrl} />
          <VideoCard videoTitle={videoTitle} videoUrl={videoUrl} />
          <VideoCard videoTitle={videoTitle} videoUrl={videoUrl} />
        </Box>
      </Box>
    </>
  );
};

export default Video;
