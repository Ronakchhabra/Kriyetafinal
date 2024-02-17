import * as React from "react";
import {useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, Toolbar } from "@mui/material";
import Sidebar from '../Sidebar/Sidebar';
import axios from "axios";
export default function CourseDetalis() {
  const [topics, setTopic] = useState([]);
  return (
    <>
        <Sidebar/>
      <Box component="main" sx={{ flexGrow: 1, p: 3,ml:50,mt:5 }}>
      <Toolbar />
      <Card sx={{ maxWidth: 700,height:50 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div" sx={{textAlign:'center'}  }>
              Node Js
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Box display={'flex'} sx={{justifyContent:'center',mr:50,mt:2}}>
      <Button  variant="contained" sx={{borderRadius:40,justifySelf:'center'}}>+</Button>
      </Box>    </Box>
    </>
  );
}
