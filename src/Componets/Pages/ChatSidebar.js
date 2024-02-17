import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChatIcon from '@mui/icons-material/Chat';
import FolderIcon from '@mui/icons-material/Folder';
import MainChat from './MainChat';
import Navbar from '../Navbar/Navbar';

const drawerWidth = 240;

export default function ChatSidebar() {
//    const navigate = useNavigate();
    function clickHandler(e){
        console.log(e);    
    }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ bgcolor:"black", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
         <Navbar/>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          ['& .MuiDrawer-paper']: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
          
              <ListItem disablePadding>
                <ListItemButton onClick={()=>clickHandler('Documentation')} >
                  <ListItemIcon>
                   <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Documentation'}/>
                </ListItemButton>
              </ListItem>
      
          </List>
          <Divider />
          <List>
              <ListItem  disablePadding>
                <ListItemButton onClick={()=>clickHandler('Video')}>
                  <ListItemIcon>
                  <ChatIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Video'} />
                </ListItemButton>
              </ListItem>
          </List>
          <Divider />
          <List>
              <ListItem  disablePadding>
                <ListItemButton onClick={()=>clickHandler('Notes')}>
                  <ListItemIcon>
                  <ChatIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Notes'} />
                </ListItemButton>
              </ListItem>
          </List>
          <Divider />
          <List>
              <ListItem  disablePadding>
                <ListItemButton onClick={()=>clickHandler('Forum')}>
                  <ListItemIcon>
                  <ChatIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Forum'} />
                </ListItemButton>
              </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <MainChat/>
      </Box>
    </Box>
  );
}