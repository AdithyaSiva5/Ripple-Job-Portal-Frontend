import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";
import { BellRing } from "lucide-react";
import { getNotifications } from "../services/api/user/apiMethods";

function Notifications() {
  const selectUser = (state:any) => state.auth.user;
  const user = useSelector(selectUser);
  const userId = user._id || "";

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      setTimeout(() => {
        getNotifications({ userId: userId })
          .then((response:any) => {
            const notificationsData = response.data.notifications;
            setNotifications(notificationsData);
            console.log(notificationsData);
            
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setLoading(false);
          });
      }, 100);
    } catch (error) {
      console.log(error);
    }
  }, []);
  
  return (
    <div>
      <div className="home-notification-section-2">
        <div className="border profile-nav flex items-center justify-start ps-6 bg-white rounded-md mt-5 mx-5">
          <p className="text-xs flex gap-2 text-gray-500">
            Notifications <BellRing color="gray" size={15} />
          </p>
        </div>

        <div className="home-scroll">
          <div className="home-scrollbox">
            {notifications?.map((notification:any) => (
              <div
                key={notification._id}
                className="pl-3 pb-2 bg-white mx-5 mt-2 rounded-lg"
              >
                <div className="flex justify-between py-4 ml-2">
                  <div className="info flex items-center justify-between w-full">
                    <div className="flex gap-2">
                      <div className="bg-gradient-to-b from-green-600 to-green-400 w-1 mr-3"></div>
                      <div className="flex items-center">
                        <img
                          src={notification.senderId.profileImageUrl}
                          alt="User"
                          className="h-10 rounded-full"
                        />
                        <div className="flex">
                          <p className="text-gray-800 ms-4 text-xs font-semibold mx-1">
                            {notification.senderId.username}
                          </p>
                          <p className="text-gray-500 text-xs mx-1">
                            {notification.message}
                          </p>
                        </div>
                        <p className="text-gray-500 text-xs ms-4 px-2"  style={{ fontSize: "9px" }}>
                        {formatDistanceToNow(
                                    new Date(notification.createdAt),
                                    { addSuffix: true }
                                  )}
                          
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end p-4 py-2">

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
