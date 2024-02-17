import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import Sidebar from "../Sidebar/Sidebar";
import { AddBox } from "@mui/icons-material";
import { Box, Button, Modal, TextField, Typography, selectClasses } from "@mui/material";
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
  const [courses, setCourses] = React.useState([]);
  let UserID = localStorage.getItem('CourseUserID');
  const CourseID = localStorage.getItem("CourseID");

    const getData = async () => {
        try {
            let res = await axios
                .get("https://hackathondb.cyclic.app/auth/getProjects/" + CourseID);
            if (res.data) { setCourses(res.data.data);console.log(res.data); setisloading(false); }
        }
        catch (err) {
            setisloading(false);
        }
    }

    React.useEffect(() => {
        getData();
    }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [Form, setForm] = React.useState({
    UserID:UserID,
    ProjectTitle: "",
    ProjectDesc: "",
    GitRepoLink: "",
    CourseID:CourseID,
  });
  const HandleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...Form, [name]: value });
  };
  const handleClick = async () => {
    setisloading(true);
    console.log(Form);
    try {
      let res = await axios.post("https://hackathondb.cyclic.app/auth/addProject",Form);
      if (res) {
        setisloading(false);
        handleClose();
        console.log(res.data);
        if (res.data.success) {
          setForm({
            UserID,
            GitRepoLink: "",
            ProjectTitle: "",
            ProjectDesc: "",
            CourseID,
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
            name="ProjectTitle"
            onChange={HandleChange}
          />
          <TextField
            variant="standard"
            sx={{ width: "100%", mt: 2 }}
            label={"Project Desc"}
            name="ProjectDesc"
            onChange={HandleChange}
          />
          <TextField
            variant="standard"
            sx={{ width: "100%", mt: 2 }}
            label={"Git Repo Link"}
            name="GitRepoLink"
            onChange={HandleChange}
          />
          <Button variant="contained" sx={{ width: "100%", mt: 2 }} onClick={handleClick}>
            Upload
          </Button>
        </Box>
      </Modal>

      <Box sx={ {marginLeft: 200, marginTop: 4} } component={'main'} >
        <Card  sx={{maxWidth: 345}}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          // title={item.ProjectTitle}
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {/* {item.ProjectDesc} */}
          {"jabfhaf"}
          </Typography>
          {/* <Link to={item.GitRepoLink}>{item.GitRepoLink}</Link> */}
          {"a,jfn"}
        </CardContent>
      </Card>
            </Box>
    </>
  );
}
