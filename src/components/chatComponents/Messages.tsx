import React, { useEffect, useRef, useState } from "react";
import { SendHorizonal, Smile, ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addMessage,
  getUserDetails,
  getUserMessages,
  setMessageRead,
} from "../../services/api/user/apiMethods";
import ChatBubbleReciver from "./ChatBubbleReciever";
import ChatBubbleSender from "./ChatBubbleSender";

function Messages({ user, currentChat, socket, onlineUsers }) {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [friend, setFriend] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const scrollRef = useRef(null);

  useEffect(() => {
    const friendUser = currentChat?.members?.find((m) => m._id !== user._id);
    setFriend(friendUser);
    setIsOnline(onlineUsers.some((u) => u.userId === friendUser?._id));

    getUserMessages(currentChat._id).then((response) => {
      setMessages(response.data);
    });
  }, [currentChat, user._id, onlineUsers]);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      getUserDetails(data.senderId).then((response) => {
        setArrivalMessage({
          sender: response.data.user,
          text: data.text,
          createdAt: data.createdAt,
        });
      });
    });
  }, [socket]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (
      arrivalMessage &&
      currentChat?.members.some((member) => member._id === arrivalMessage.sender._id)
    ) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]); 

  useEffect(() => {
    setMessageRead({ conversationId: currentChat._id, userId: user._id });
  }, [currentChat._id, user._id]);

  const handleSubmit = () => {
    if (!newMessage.trim()) return;

    const receiverId = currentChat.members.find((member) => member._id !== user._id)?._id;

    socket.current?.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
      createdAt: Date.now(), 
    });

    addMessage({
      conversationId: currentChat._id,
      sender: user._id,
      text: newMessage,
    }).then((response) => {
      setMessages([...messages, response.data]);
      setNewMessage("");
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-primary  ">
      {/* Header */}
      <div className="flex items-center p-4 bg-secondary border-b">
        <div
          className="w-10 h-10 bg-center bg-no-repeat bg-cover rounded-full border border-green mr-3"
          style={{ backgroundImage: `url(${friend?.profileImageUrl})` }}
        />
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-600 dark:text-white">
            {friend?.username}
          </div>
          {isOnline && <div className="text-xs text-green-600">Online</div>}
        </div>
        <button
          onClick={() => navigate(location.state?.from || "/home")}
          className="text-xs bg-white p-2 text-gray-500 rounded-md border hover:bg-gray-300"
        >
          <ChevronLeft size={18} /> Back
        </button>
      </div>

      {/* Messages area */} 
      <div className="flex-1 overflow-y-auto " ref={scrollRef}>
        <div className="flex flex-col p-4">
          <div className="self-center px-2 py-1 m-2 text-xs text-gray-700 bg-white border border-gray-200 rounded-full shadow">
            Channel was created
          </div>
          <div className="self-center px-2 py-1 m-2 text-xs text-gray-700 bg-white border border-gray-200 rounded-full shadow">
            {currentChat?.createdAt && new Date(currentChat.createdAt).toLocaleDateString()}
          </div>

          {messages.map((message, index) => (
            <div key={index} className="mb-3">
              {message?.sender._id === user._id || message?.sender === user._id ? (
                <ChatBubbleSender message={message} />
              ) : (
                <ChatBubbleReciver message={message} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="p-4 bg-secondary">
        <div className="relative">
          <input
            value={newMessage}
            onKeyPress={handleKeyPress}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full h-10 pl-10 pr-10 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
          />
          <Smile size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <button
            onClick={handleSubmit}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-700"
          >
            <SendHorizonal size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Messages;