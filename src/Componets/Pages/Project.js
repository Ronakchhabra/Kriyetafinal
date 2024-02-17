import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import Sidebar from "../Sidebar/Sidebar";
import { AddBox } from "@mui/icons-material";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

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

export default function Project() {
  const [open, setOpen] = React.useState(false);
  const [isloading, setisloading] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [Form, setForm] = React.useState({
    VideoLink: "",
    VideoTitle: "",
    VideoDesc: "",
    CourseID: "1",
  });
  const HandleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...Form, [name]: value });
  };
  const handleClick = async () => {
    setisloading(true);
    const formData = new FormData();
    formData.append("VideoTitle", Form.VideoTitle);
    formData.append("VideoDesc", Form.VideoDesc);
    if (Form.VideoLink instanceof File) {
      formData.append("VideoLink", Form.VideoLink);
      formData.append("VideoLink", Form.CourseID);
    }
    try {
      let res = await axios.post(
        "http://localhost:3001/auth/addVideo",
        formData
      );
      if (res) {
        // toast.success(res.data.message);
        setisloading(false);
        handleClose();
        console.log(res.data);
        if (res.data.success) {
          setForm({
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
          Add Projects
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center" }}
          >
            Add Projects
          </Typography>
          <TextField
            variant="standard"
            sx={{ width: "100%", mt: 2 }}
            label={"Project Title"}

          />
          <TextField
            variant="standard"
            sx={{ width: "100%", mt: 2 }}
            label={"Project Desc"}
          />
          <TextField
            variant="standard"
            sx={{ width: "100%", mt: 2 }}
            label={"Git Repo Link"}
          />
          <Button variant="contained" sx={{ width: "100%", mt: 2 }}>
            {" "}
            Upload{" "}
          </Button>
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
          <Link to="/">https://kfnjdfndf.com/ajsfa/</Link>
        </CardContent>
      </Card>
    </>
  );
}
