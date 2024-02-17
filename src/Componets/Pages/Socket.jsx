import io from "socket.io-client";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import axios from 'axios'

const socket = io.connect("http://localhost:3000");

function Socket() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [fetchedGroupId, setFetchedGroupId] = useState('');
    const [fetchedGroupName, setFetchedGroupName] = useState('');
    const [data, setData] = useState([]);

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
            setShowChat(true);
        }
    };

    const handleJoinRoom = (groupId) => {
        setUsername("ratnesh125");
        setRoom(groupId);
        joinRoom(); // Make sure to call the function
    };

    const getData = () => {
        axios.get('http://localhost:3002/groupchats').then((response) => {
            setData(response.data);
            console.log(response.data);
        });
    };

    useEffect(() => {
        getData();
    }, []);

    const userName = "ratnesh125"; //fetched from backend
    const commGrpId = "gtef77weufj"; //  fetched on click from the group component
    const commName = "";

    const handleCreateCommunity = () => {
        axios.post('http://localhost:3002/creategroup', {
            groupName: groupName,
            members: [userName]
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div className="App">
            <input
                type="text"
                placeholder="group name"
                onChange={(event) => {
                    setGroupName(event.target.value);
                }}
            />
            <br />
            {data?.map((item) => (
                <div key={item._id}>
                    <h3>{item.groupId}</h3>
                    <h3>{item.groupName}</h3>
                    <button onClick={() => handleJoinRoom(item.groupId)}>
                        Join new room
                    </button>
                </div>
            ))}
            <button onClick={handleCreateCommunity}>Create new community</button>
            {!showChat ? (
                <div className="joinChatContainer">
                    <h3>Join A Chat</h3>
                    <input
                        type="text"
                        placeholder="Username..."
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Room ID..."
                        onChange={(event) => {
                            setRoom(event.target.value);
                        }}
                    />
                    <button onClick={joinRoom}>Join A Room</button>
                </div>
            ) : (
                <Chat socket={socket} username={username} room={room} />
            )}
        </div>
    );
}

export default Socket;
