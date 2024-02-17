import React from "react";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import axios from "axios";
import Chats from "./Chats";
import { AppBar, Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { AccountBalance } from "@mui/icons-material";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Mail from "@mui/icons-material/Mail";
import { useTheme } from "@mui/material";
const socket = io.connect("http://localhost:3002");
const drawerWidth = 240;

function MainChat(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [data, setData] = useState([]);

  const getData = () => {
    try {
      axios.get("https://localhost:3002/groupchats")
        .then((response) => {
          setData(response?.data);
          console.log(response?.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);
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
         
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const handleJoinRoom = (groupId, groupName) => {
    setUsername("ratnesh125");
    setRoom(groupId);
    setGroupName(groupName);
    joinRoom(); // Make sure to call the function
  };

  const userName = "ratnesh125"; //fetched from backend
  // const commGrpId = "gtef77weufj"; //  fetched on click from the group component
  // const commName = "";

  const handleCreateCommunity = (e) => {
    try {
      axios
        .post("https://localhost:3002/creategroup", {
          groupName: groupName,
          members: [userName],
        })
        .then(function (response) {
          console.log(response);
          console.log(groupName);
          getData(); // Fetch updated data after creating the community
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    catch (err) {
      console.log(err)
    }
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
                <ListItemButton onClick={() => navigate('/courses')}>
                  <ListItemIcon>
                    <AccountBalance />
                  </ListItemIcon>
                  <ListItemText primary={"Courses"} />
                </ListItemButton>
              </ListItem>
            </List>
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
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/community')}>
                  <ListItemIcon >
                    <AccountBalance />
                  </ListItemIcon>
                  <ListItemText primary={"Community Support"} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div className="flex flex-row h-dvh" >
          <div className="w-1/3 overflow-y-auto border">
            <div className="mb-4 text-xl font-bold">Community</div>

            <div className="flex flex-col h-[1000px]">
              <div className="overflow-y-auto max-h-96">
                {data?.map((item) => (
                  <div
                    className="flex items-center justify-between p-4 mb-2 bg-gray-200 rounded-md"
                    key={item._id}
                  >
                    <h3 className="text-lg font-bold">{item.groupName}</h3>
                    <button
                      className="px-4 py-2 text-white bg-blue-500 rounded-md"
                      onClick={() => handleJoinRoom(item.groupId, item.groupName)}
                    >
                      Join room
                    </button>
                  </div>
                ))}
              </div>

              <label className="mt-4 text-xl font-bold" id="ronak">
                Enter Community Name
              </label>
              <input
                type="text"
                placeholder="Enter Community Name"
                onChange={(event) => {
                  setGroupName(event.target.value);
                }}
                name="ronak"
                className="w-full px-2 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />

              <br />
              <button
                className="px-1 py-1 text-white bg-black rounded-md"
                onClick={handleCreateCommunity}
              >
                Create new community
              </button>
            </div>
          </div>

          <div className="w-2/3 h-full border">
            <h3> Chat</h3>
            <div className="App">
              {!showChat ? (
                <div >
                  <h3>No Current Chat</h3>
                </div>
              ) : (
                <Chats
                  socket={socket}
                  username={username}
                  room={room}
                  groupName={groupName}
                />
              )}
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}

export default MainChat;
