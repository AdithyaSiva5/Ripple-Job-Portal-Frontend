
import { useEffect, useRef, useState } from 'react';
import ChatBubbleReciver from './ChatBubbleReciever'
import ChatBubbleSender from './ChatBubbleSender'
import { SendHorizonal, Smile,ChevronLeft } from 'lucide-react'
import { addMessage, getUserDetails, getUserMessages, setMessageRead } from '../../services/api/user/apiMethods';
import {useLocation,useNavigate} from 'react-router-dom';

function Messages({ user, currentChat,socket,onlineUsers}:any) {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [friend, setFriend] = useState<any>(null);
  const [isOnline, setIsOnline] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const scrollRef = useRef<any>();



  useEffect(() => {


    const friend = currentChat?.members?.find((m:any) => m._id !== user._id);
    setIsOnline(() => {
      if (onlineUsers.find((user:any) => user.userId === friend?._id)) {
        return true;
      } else {
        return false;
      }
    });
    setFriend(friend);
    getUserMessages(currentChat._id).then((response:any) => {
      setMessages(response.data);
    });
  }, [currentChat]);
  useEffect(()=>{
    socket.current.on("getMessage", (data: any) => {
      const senderId = data.senderId;
      getUserDetails(senderId).then((response: any) => {
        
        setArrivalMessage({
          
          sender: response.data.user,
          text: data.text,
          createdAt:data.createdAt
        
        });
        console.log(arrivalMessage);
      });
      });
    
  },[socket])
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    (arrivalMessage && currentChat?.members.includes(arrivalMessage?.sender)) ||
      (currentChat?.members.find(
        (member:any) => member._id !== arrivalMessage?.sender
      ) &&
        setMessages((prev) => [...prev, arrivalMessage]));
  }, [arrivalMessage, currentChat]);




  const handleSubmit = () => {
    const userId = user._id;
    const receiver = currentChat.members.find(
      (member:any) => member._id !== user._id
    );
    const receiverId = receiver ? receiver._id : null;
    console.log(receiverId);
    
    socket.current?.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: newMessage,
      createdAt:Date.now()
    });

    addMessage({
      conversationId: currentChat._id,
      sender: userId,
      text: newMessage,
    }).then((response:any) => {

      setNewMessage("");
      setMessages([...messages, response.data]);

    });
  };

  const handleKeyPress = (e:any) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  
  useEffect(() => {
    setMessageRead({ conversationId: currentChat._id, userId: user._id });
  }, [socket]);


  return (
    <div className="relative flex flex-col flex-1">
    <div className="z-20 flex flex-grow-0 flex-shrink-0 w-full pr-3 bg-white border-b">
    <div
          className="w-10 h-10 mx-4 my-2 text-sm bg-center bg-no-repeat bg-cover rounded-full cursor-pointer"
          style={{
            backgroundImage: `url(${friend?.profileImageUrl})`,
          }}
        ></div>
      <div className="flex flex-col justify-center flex-1 overflow-hidden">

      <div className="overflow-hidden text-sm font-medium leading-tight text-gray-600 whitespace-no-wrap">
            {friend?.username}
          </div>
          {isOnline && (
            <div className="overflow-hidden text-xs text-green-600  leading-tight  whitespace-no-wrap">
              Online
            </div>
          )}
      </div>
     
      <button onClick={()=>{navigate(location.state?.from || "/home")}} className="text-xs bg-white flex self-center p-2 ml-2 text-gray-500 rounded-md border focus:outline-none hover:text-gray-600 hover:bg-gray-300">
      <ChevronLeft size={18}/> Back
      </button>
    
    </div>
    <div className="message-scrollbox-post top-0 bottom-0 left-0 right-0 flex flex-col flex-1 overflow-hidden bg-transparent bg-bottom bg-cover ">
      <div className="message-scroll-post self-center flex-1 w-full " ref={scrollRef}>
        <div className="relative flex flex-col px-3 py-1 m-auto w-full">
          <div className="self-center px-2 py-1 mx-0 my-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-full shadow rounded-tg">Channel was created</div>
          <div className="self-center px-2 py-1 mx-0 my-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-full shadow rounded-tg">{currentChat?.createdAt &&
                    new Date(currentChat.createdAt).toLocaleDateString()}</div>
        
          {messages.length!==0 &&
                  messages.map((message ,index) => {
                    return message?.sender._id === user._id ||
                      message?.sender === user._id ? (
                    <div className='mb-3'>
                                              <ChatBubbleSender message={message} />


                    </div>
                     
                     
                    ) : (
                      <div className='mb-3' >
                                              <ChatBubbleReciver message={message} />


                      </div>
                      
                    );
                  })}

        </div>
      </div>
      <div className="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
        <div className="w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-6">
            <button type="submit" className="p-1 focus:outline-none focus:shadow-none">
               <Smile size={18}/>
            </button>
          </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-6">
            <button onClick={handleSubmit} className="p-1 focus:outline-none focus:shadow-none hover:text-green-600">
             <SendHorizonal size={18} color='green'/>
       
            </button>
          </span>
            <input
             value={newMessage}
             onKeyPress={handleKeyPress}
               placeholder="Type your message..."
               onChange={(e) => setNewMessage(e.target.value)}
            type="text" className="w-full items-center h-10 pl-10 pr-4  bg-white  text-xs border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"  />
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default Messages