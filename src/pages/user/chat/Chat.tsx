import ChatUsers from "../../../components/chatComponents/ChatUser";
import Messages from "../../../components/chatComponents/Messages";
import { addConversation, getUserConversations } from "../../../services/api/user/apiMethods";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import NochatScreen from "../../../components/chatComponents/NochatScreen";
import { io } from "socket.io-client";
import { BASE_URL } from "../../../constants/baseUrls"
import { useLocation } from "react-router-dom";

function Chat() {
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const userId = user._id; 
  const [conversations, setConversations] = useState<any[]>([]);
  const [currentChat, setCurrentChat] = useState('');
  const socket = useRef<any>() 
  const [onlineUsers, setOnlineUsers] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const messageUserId = queryParams.get("userId");
  
  useEffect(() => {
    socket.current = io(BASE_URL);

    if(messageUserId){
      addConversation({ senderId: userId, receiverId: messageUserId }).then(
        (response:any) => {
          const userData = response.data;
          const existChat = conversations.filter((con:any)=>con._id===userData._id);
          if(!existChat.length){
              setConversations((prev) => [...prev, userData]);
          }
          setCurrentChat(userData);
        }
      );
    }
    getUserConversations(userId).then((response: any) => {
      setConversations(response.data);
    });
  }, []);
  useEffect(() => {
    socket?.current?.emit("addUser", user._id);
    socket?.current?.on("getUsers", (users:any) => {
      setOnlineUsers(users);
      
    });
  }, [user]);

  useEffect(() => {

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCurrentChat(''); 
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);


  return (
    <div> 
      <div className="relative flex w-full  overflow-hidden antialiased bg-gray-200" style={{ height: "730px" }}>

        <ChatUsers conversations={conversations}  onlineUsers={onlineUsers}   user={user}  setCurrentChat={setCurrentChat} setConversations={setConversations} />

        {currentChat ? <Messages user={user}   onlineUsers={onlineUsers} socket={socket} currentChat={currentChat} /> : <NochatScreen/>}

      </div>
    </div>
  );
}

export default Chat;
