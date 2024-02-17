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
import { AccountBalance, AddBox, ExpandLess, ExpandMore, HomeOutlined, Inbox, Mail, PeopleOutlined } from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, Collapse, Grid, InputLabel,MenuItem, Select, useTheme } from "@mui/material";
import NotFound from "./NotFound";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Collapse from "@mui/material/Collapse";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const drawerWidth = 240;
export default function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isloading, setisloading] = useState(true);

  React.useEffect(() => {
    const getData = async () => {
      try {
        let res = await axios
          .get("https://hackathondb.cyclic.app/auth/getAllCourse")
        if (res.data) { setCourses(res.data.data); setisloading(false); }
      }
      catch (err) {
        setisloading(false);
      }
    }
    getData();
  }, []);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);

  const handleCommunityClick = () => {
    setIsCommunityOpen(!isCommunityOpen); // Toggle open/close state
  };
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [isCollapse, setIsCollapse] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };
         

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
                <ListItem button onClick={() => navigate('/courses')}>
                  <ListItemIcon>
                    <AccountBalance />
                  </ListItemIcon>
                  <ListItemText primary={"Courses"} />
                </ListItem>
              </ListItem>
            </List>
            <Divider />



 <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={handleCollapse}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Mail />
              </ListItemIcon>
              <ListItemText primary="My Course" sx={{ opacity: open ? 1 : 0 }} />
              {isCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon/>}
            </ListItemButton>
          </ListItem>
          <Collapse in={isCollapse} timeout="auto" unmountOnExit>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={()=>navigate('/mycourse/docsadmin')}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <Mail/>
                  </ListItemIcon>
                  <ListItemText primary={'Documentation'} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={()=>navigate('/mycourse/videoadmin')}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <Mail/>
                  </ListItemIcon>
                  <ListItemText primary={'Video'} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={()=>navigate('/mycourse/notesadmin')}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <Mail/>
                  </ListItemIcon>
                  <ListItemText primary={'Notes'} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>

          </Collapse>
        </List>
            <List>
              <ListItem disablePadding>
                <ListItem button onClick={() => navigate('/community')}>
                  <ListItemIcon >
                    <AccountBalance />
                  </ListItemIcon>
                  <ListItemText primary={"Community Support"} />
                </ListItem>
              </ListItem>
            </List>
          </Box>
        </Drawer>

        <Box sx={{ flexDirection: 'column', width: '100%', flexGrow: 1, p: 3, ml: 0, mt: 10, }}>
          <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
            <Button startIcon={<AddBox />} onClick={() => navigate("/AddCourse")} variant='contained' >Add Course</Button>
          </Box>
          <Box component="main" sx={{ flexGrow: 1, p: 3, display: "flex" }}>
            <Toolbar />
            <Grid container spacing={0}>
              {
                isloading ? <div className="spinner" /> :
                  courses?.length > 0 ?
                    courses?.map((c) => {
                      return (
                        <Grid item xs={4} md={4} display={'flex'} sx={{ flexDirection: 'row' }} key={c._id} mt={5}>
                          <Card
                            sx={{ maxWidth: 345 }}
                            key={c._id}
                            onClick={() => { localStorage.setItem("CourseID", c._id); localStorage.setItem("CourseUserID", c.userID); navigate("/coursedetalis") }}
                          >
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                sx={{ height: '200px' }}
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
                        </Grid>
                      )
                    })
                    :
                    <NotFound />
              }
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}
