import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { Box, Button, TextField } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
    ["link", "image", "video"], // link and image, video
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "code-block",
  "link",
  "image",
  "video",
  "color",
  "background",
];

export default function Quill({selectedCourse}) {
  const [isLoading, setisLoading] = useState(false);
  const [value, setValue] = useState("");
  const [Title, setTitle] = useState("");
  const quillRef = useRef(null);
  const navigate = useNavigate();
  let UserID = localStorage.getItem('userID')
  const handleClick = async() => {
    setisLoading(true)
    const html = quillRef.current.editor.root.innerHTML;
    const data = {
      UserID,
      CourseID: selectedCourse._id,
      subTitle: Title,
      subContent: html,
      ContentID: Date.now(),
    };
    try{
     let res = await axios.post('https://hackathondb.cyclic.app/auth/addDoc',data);
     if(res.data){
       setisLoading(false)
      console.log(res.data);
      navigate('/coursedetalis/'+selectedCourse._id);
    }
    }catch(err){
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      {isLoading ? <div className="spinner"/> :
      <Box sx={{ mt: 10, ml: 5 }}>
        <TextField
          label="Title"
          variant="outlined"
          name="Title"
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ width: "90%", mb: 5 }}
        ></TextField>

        <ReactQuill
          modules={modules}
          formats={formats}
          ref={quillRef}
          theme={"snow"}
          value={value}
          onChange={setValue}
          readOnly={false}
          style={{ width: "90%", height: "50vh" }}
        />
        <Box sx={{ mt: 6 }}>
          <Button variant="contained" onClick={handleClick}>
            publish
          </Button>
        </Box>
      </Box>}
    </>
  );
}
