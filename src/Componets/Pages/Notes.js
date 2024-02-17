import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import Sidebar from "../Sidebar/Sidebar";
import { AddBox, CloudUpload } from "@mui/icons-material";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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

export default function Notes({ selectedCourse }) {
  const [open, setOpen] = React.useState(false);
  const [isloading, setisloading] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let UserID = localStorage.getItem('userID')
  const [Form, setForm] = React.useState({
    UserID,
    NotesLink: "",
    NotesTitle: "",
    NotesDesc: "",
    CourseID: selectedCourse._id,
  });
  console.log(selectedCourse);
  const HandleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...Form, [name]: value });
  };
  const handleFileChangeVideo = (e) => {
    const file = e.target.files[0];
    setForm({ ...Form, NotesLink: file });
  };
  const handleClick = async () => {
    setisloading(true);
    console.log(Form);
    const formData = new FormData();
    formData.append("UserID", Form.UserID);
    formData.append("NotesTitle", Form.NotesTitle);
    formData.append("NotesDesc", Form.NotesDesc);
    if (Form.NotesLink instanceof File) {
      formData.append("NotesLink", Form.NotesLink);
    }
    formData.append("CourseID", Form.CourseID);
    try {
      let res = await axios.post(
        "https://hackathondb.cyclic.app/auth/addNotes",
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
            NotesLink: "",
            NotesTitle: "",
            NotesDesc: "",
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "end",
          mr: 2,
          mt: 10,
        }}
      >
        <Button startIcon={<AddBox />} variant="contained" onClick={handleOpen}>
          Add Notes
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center' }}>
            Add Notes
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
          <TextField
            id="standard-basic"
            label="Title"
            variant="standard"
            sx={{ width: '100%' }}
            name="NotesTitle"
            onChange={HandleChange}
          />
          <TextField
            id="standard-basic"
            label="Description"
            variant="standard"
            sx={{ width: '100%' }}
            name="NotesDesc"
            onChange={HandleChange}
          />
          <TextField
            sx={{ width: "100%" }}
            type="file"
            name="NotesLink"
            accept="video/*"
            onChange={(e) => handleFileChangeVideo(e)}
            className="form-control"
          />
          {/* <Button
              component="label"
              variant="outlined"
              sx={{ mt: 3 ,width:'100%'}}
              startIcon={<CloudUpload />}
            >
              Upload Pdf
              <VisuallyHiddenInput type="file" />
            </Button> */}
          <Button variant="contained" sx={{ display: "block", mt: 2, width: '100%' }} onClick={handleClick}>
            Add Notes
          </Button>
          {/* </Typography> */}
        </Box>
      </Modal>
      <Card sx={{ maxWidth: 345, marginLeft: 50, marginTop: 4 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
