import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import AddBox from "@mui/icons-material/AddBox";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Documentation({setselectedDocs}) {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isloading, setisloading] = useState(true);
  React.useEffect(() => {
    const getData = async() => {
      try{
        let res = await axios
          .get("http://localhost:3001/auth/getDoc")
          if(res.data) {setCourses(res.data);setisloading(false);}
      }
      catch(err){
        setisloading(false);
      }
    }
    getData();
  }, []);
  return (
    <>
      <Sidebar />
      <div style={{ marginLeft: 50, marginTop: 100 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "end",
            mr: 2,
          }}
        >
          <Button startIcon={<AddBox />} variant="contained" onClick={()=>navigate('/editor')}>
            Add Documentation
          </Button>
        </Box>
        <div>
          {isloading ? 
          <div className="spinner" /> : 
          courses?.map((item)=>{
            return(
              <>
          <Card sx={{ maxWidth: "full", height: 50, mt: 2 }} key={item._id}>
            <CardActionArea>
              <CardContent onClick={()=>{setselectedDocs(item);navigate('/DocumentationContent')}}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ textAlign: "center" }}
                >
                  {item.subTitle}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                    <AddBox />
                  </div>
                  </>
          )})
          }

        </div>
      </div>
    </>
  );
}

export default Documentation;
