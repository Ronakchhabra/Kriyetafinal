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
import { AccountBalance } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    InputAdornment,
    TextField,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { AddTask, Check, Clear, Search } from "@mui/icons-material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const drawerWidth = 240;

export default function DocsAdmin() {
    let i = 0;
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [isloading, setisloading] = useState(true);
    const id = localStorage.getItem("userID");

    const getData = async () => {
        try {
            let res = await axios
                .get("https://hackathondb.cyclic.app/auth/getDocs/" + id);
            if (res.data) { setCourses(res.data.data); setisloading(false); }
            console.log(res.data)
        }
        catch (err) {
            setisloading(false);
        }
    }

    React.useEffect(() => {
        getData();
    }, []);
    const handlerequest = async (id, Statusmsg) => {
        let data = { id, Statusmsg };
        try {
            let res = await axios.post('https://hackathondb.cyclic.app/UpdateStatus', data);
            if (res) { alert("Update Successfully");getData(); };
        } catch (err) {
            console.log(err)
        }
    }

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
                        ['&.MuiDrawer-paper']: {
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
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => navigate('/mycourse/docsadmin')}>
                                    <ListItemIcon>
                                        <AccountBalance />
                                    </ListItemIcon>
                                    <ListItemText primary={"MyCourse"} />
                                </ListItemButton>
                            </ListItem>
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
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    bgcolor: "#F5F5F5",
                    height: "auto",
                    marginLeft: "300px",
                }}
            >
                <Toolbar />
                <Typography
                    variant="h4"
                    sx={{ fontSize: "20px", color: "#6945FF", textAlign: "center" }}
                >
                    Documentation Monitoring
                </Typography>
                <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        {/* // first Row */}
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    colSpan={18}
                                    sx={{
                                        fontFamily: "Roboto",
                                        fontSize: "24px",
                                        fontWeight: 600,
                                        lineHeight: "30px",
                                        letterSpacing: "0em",
                                        textAlign: "center",
                                    }}
                                >
                                    Documentation Monitoring
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {/* //second row */}
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    sx={{
                                        fontFamily: "Roboto",
                                        fontSize: "20px",
                                        fontWeight: 600,
                                        lineHeight: "0px",
                                        letterSpacing: "0em",
                                    }}
                                >
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        // onChange={(e) => setsearchQuery(e.target.value)}
                                        sx={{ m: 1, width: "25ch" }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Search />
                                                </InputAdornment>
                                            ),
                                        }}
                                        placeholder="Seach Here..."
                                    />
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        {/* // Thrid row */}
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    align="center"
                                    sx={{
                                        fontFamily: "Roboto",
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        lineHeight: "16px",
                                        letterSpacing: "0em",
                                    }}
                                >
                                    Id
                                </TableCell>
                                {/* <TableCell
                                    align="center"
                                    sx={{
                                        fontFamily: "Roboto",
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        lineHeight: "16px",
                                        letterSpacing: "0em",
                                    }}
                                >
                                    Documentation Date
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        fontFamily: "Roboto",
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        lineHeight: "16px",
                                        letterSpacing: "0em",
                                    }}
                                >
                                    Documentation Time
                                </TableCell> */}
                                <TableCell
                                    align="center"
                                    sx={{
                                        fontFamily: "Roboto",
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        lineHeight: "16px",
                                        letterSpacing: "0em",
                                    }}
                                >
                                    Documentation SubTitle
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        fontFamily: "Roboto",
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        lineHeight: "16px",
                                        letterSpacing: "0em",
                                    }}
                                >
                                    Documentation SubTitle
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        fontFamily: "Roboto",
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        lineHeight: "16px",
                                        letterSpacing: "0em",
                                    }}
                                >
                                    Documentation Content ID
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        fontFamily: "Roboto",
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        lineHeight: "16px",
                                        letterSpacing: "0em",
                                    }}
                                >
                                    Status
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        fontFamily: "Roboto",
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        lineHeight: "16px",
                                        letterSpacing: "0em",
                                    }}
                                >
                                    Accept
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        fontFamily: "Roboto",
                                        fontSize: "14px",
                                        fontWeight: 700,
                                        lineHeight: "16px",
                                        letterSpacing: "0em",
                                    }}
                                >
                                    Reject
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {courses?.map((user) => {
                            i = i + 1;
                            return (
                                <TableBody key={user?._id}>
                                    <TableRow>
                                        <TableCell align="center">{i}</TableCell>
                                        {/* <TableCell align="center">{user._id}</TableCell> */}
                                        <TableCell align="center">
                                            {user?.subTitle}
                                        </TableCell>
                                        <TableCell align="center">
                                            {user?.subContent?.slice(0, 20)}
                                        </TableCell>
                                        <TableCell align="center">
                                            {user?.ContentID}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography
                                                style={
                                                    user?.Status === "Accepted"
                                                        ? {
                                                            backgroundColor: "blue",
                                                            color: "white",
                                                            padding: "5px",
                                                        }
                                                        : {
                                                            backgroundColor: "red",
                                                            color: "white",
                                                            padding: "5px",
                                                        }
                                                }
                                            >
                                                {user?.Status}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Check
                                                sx={{ cursor: "pointer" }}
                                                onClick={() => handlerequest(user._id, "Accepted")}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Clear
                                                sx={{ cursor: "pointer" }}
                                                onClick={() => handlerequest(user._id, "Rejected")}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            );
                        })}
                    </Table>
                </TableContainer>
            </Box>
            <ToastContainer />
        </>
    );
}