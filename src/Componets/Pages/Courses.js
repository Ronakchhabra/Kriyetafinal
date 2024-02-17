import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Navbar from "../Navbar/Navbar";
import { AccountBalance, AddBox } from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";
import NotFound from "./NotFound";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const drawerWidth = 240;

export default function Courses({setselectedCourse}) {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isloading, setisloading] = useState(true);
  React.useEffect(() => {
    const getData = async() => {
      try{
        let res = await axios
          .get("http://localhost:3001/auth/getAllCourse")
          if(res.data) {setCourses(res.data.data);setisloading(false);}
      }
      catch(err){
        setisloading(false);
      }
    }
    getData();
  }, []);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Navbar />
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={()=>navigate('/courses')}>
                  <ListItemIcon>
                    <AccountBalance />
                  </ListItemIcon>
                  <ListItemText primary={"Courses"} />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={()=>navigate('/community')}>
                  <ListItemIcon >
                    <AccountBalance />
                  </ListItemIcon>
                  <ListItemText primary={"Community Support"} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box sx={{flexDirection:'column',width:'100%',flexGrow: 1, p: 3, ml: 0, mt: 10 ,}}>
        <Box sx={{display:'flex',justifyContent:'end',alignItems:'end'}}>
            <Button startIcon={<AddBox/>} onClick={()=>navigate("/AddCourse")} variant='contained' >Add Course</Button>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3,display:"flex"}}>
          <Toolbar />
          {
            isloading ? <div className="spinner"/>:
            courses?.length>0 ? 
            courses?.map((c)=>{
              return(
          <Card
            sx={{ maxWidth: 345}}
            key={c._id}
            onClick={() => {setselectedCourse(c);navigate("/CourseDetalis")}}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={c.imageLink} 
                alt={c._id}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {c.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {c.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
            )})
            :            
              <NotFound/>
          }
        </Box>
        </Box>
      </Box>
    </>
  );
}
