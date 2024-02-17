import React, { useEffect, useState } from "react";

function Chat({ socket, username, room ,groupName}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    console.log(groupName)

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        const receiveMessageHandler = (data) => {
            setMessageList((list) => [...list, data]);
        };

        socket.on("receive_message", receiveMessageHandler);

        return () => {
            socket.off("receive_message", receiveMessageHandler);
        };
    }, [socket]);

    return (
        <div className="flex flex-col h-[550px]">
            <div className="bg-gray-800 p-4 text-white">
                <p className="text-lg font-bold">Live Chat of {groupName} Community</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                {messageList.map((messageContent, index) => (
                    <div
                        key={index}
                        className={`${username === messageContent.author ? "justify-end" : "justify-start"
                            } flex mb-4`}
                    >
                        <div
                            className={`${username === messageContent.author ? "bg-blue-500" : "bg-gray-300"
                                } rounded p-3`}
                        >
                            <p className="text-white">{messageContent.message}</p>
                            <div className="flex justify-between mt-2">
                                <p className="text-xs text-gray-500">{messageContent.time}</p>
                                <p className="text-xs font-semibold">
                                    {messageContent.author}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-gray-800 p-4">
                <div className="flex">
                    <input
                        type="text"
                        value={currentMessage}
                        placeholder="Hey..."
                        onChange={(event) => {
                            setCurrentMessage(event.target.value);
                        }}
                        className="flex-1 p-2 mr-2 border rounded"
                    // onKeyPress={(event) => {
                    //   event.key === "Enter" && sendMessage();
                    // }}
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        &#9658;
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;