import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import Sidebar from "../Sidebar/Sidebar";
import { AddBox, CloudUpload } from "@mui/icons-material";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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

export default function Notes() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
          Add Notes
        </Button>
      </Box>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign:'center'}}>
              Add Notes
            </Typography>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
            <TextField
              id="standard-basic"
              label="Title"
              variant="standard"
              sx={{width:'100%'}}
            />
            <TextField
              id="standard-basic"
              label="Description"
              variant="standard"
              sx={{width:'100%'}}

            />
            <Button
              component="label"
              variant="outlined"
              sx={{ mt: 3 ,width:'100%'}}
              startIcon={<CloudUpload />}
            >
              Upload Pdf
              <VisuallyHiddenInput type="file" />
            </Button>
            <Button variant="contained" sx={{ display: "block", mt: 2,width:'100%' }}>
              Add Notes
            </Button>
            {/* </Typography> */}
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
        </CardContent>
      </Card>
    </>
  );
}
