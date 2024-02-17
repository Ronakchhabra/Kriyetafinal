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
import { useNavigate, } from "react-router-dom";
import axios from "axios";

function Documentation({ setselectedDocs }) {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isloading, setisloading] = useState(true);
  const CourseID = localStorage.getItem('CourseID');
  const getData = async () => {
    try {
      let res = await axios
        .get("https://hackathondb.cyclic.app/auth/getDoc/" + CourseID);
      if (res.data) { setCourses(res.data); console.log(res.data); setisloading(false); }
      if (res.data === "") {
        setisloading(false);
      }
    }
    catch (err) {
      setisloading(false);
    }
  }
  const handlePlus = (prev,next) => {
    if(next !== null){
      console.log(prev ,next);
      const sum = (prev/2) + ((next)/2);
      const ContentID = Math.floor(sum);
      localStorage.setItem('ContentID',ContentID);
      navigate('/editor')
    }
    else{
      navigate('/editor')
    }
  }
  React.useEffect(() => {
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
          <Button startIcon={<AddBox />} variant="contained" onClick={() => navigate('/editor')}>
            Add Documentation
          </Button>
        </Box>
        <div>
          {isloading ?
            <div className="spinner" /> :
            courses?.length === 0 ?
              <Card sx={{ maxWidth: "full", height: 50, mt: 2 }} >
                <CardActionArea>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ textAlign: "center" }}
                    >
                      {"No Documentation Added Yet"}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              : courses?.map((item, index) => {
                const nextitem = courses[index + 1];
                return (
                  <div key={item._id}>
                    <Card sx={{ maxWidth: "full", height: 50, mt: 2 }}>
                      <CardActionArea>
                        <CardContent onClick={() => { navigate('/DocumentationContent'); setselectedDocs(item) }}>
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
                    <div style={{ display: "flex", justifyContent: "center" }} onClick={() => handlePlus(item?.ContentID, nextitem?.ContentID ? nextitem?.ContentID : null)}>
                      <AddBox />
                    </div>
                  </div>
                )
              })
          }

        </div>
      </div>
    </>
  );
}

export default Documentation;
