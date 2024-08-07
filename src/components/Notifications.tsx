import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";
import { BellRing, Trash2 } from "lucide-react";
import { clearNotifications, getNotifications } from "../services/api/user/apiMethods";
import { toast } from "sonner";

function Notifications() {
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const userId = user._id || "";

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      setTimeout(() => {
        getNotifications({ userId: userId })
          .then((response: any) => {
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
  const handleClearNotifications = () => {
    clearNotifications({ userId: userId })
      .then(() => {
        setNotifications([]);
        toast.success("Cleared")
      })
      .catch((error) => {
        toast.error(error)
        console.log(error);
      });
  };


  if (notifications.length === 0 && !loading) {
    return (
      <div className="home-notification-section-2 ">
        <div className="border profile-nav flex items-center justify-start ps-6 bg-white rounded-md mt-5 mx-5">
          <p className="text-xs flex gap-2 text-gray-500">
            Notifications <BellRing color="gray" size={15} />
          </p>
          
        </div>
        <div className="dark:text-white pt-1 mr-1 pr-20 ">No notifications</div>
      </div>
    )
  }

  return (
    <div>
      <div className="home-notification-section-2">
        <div className="border profile-nav flex items-center justify-between ps-6 bg-secondary dark:border dark:border-green rounded-md mt-5 mx-5">
          <p className="text-xs flex gap-2 text-gray-500 dark:text-white">
            Notifications <BellRing color="gray" size={15} />
          </p>
          <button
          onClick={handleClearNotifications}
          className="text-xs text-gray-500 dark:text-red-400  hover:text-red-500 transition-colors duration-200 pr-10 "
        >
          <Trash2 size={15} />
        </button>
        </div>
        

        <div className="home-scroll2">
          <div className="home-scrollbox">
            {notifications?.map((notification: any) => (
              <div
                key={notification._id}
                className="pl-3 pb-2 bg-secondary mx-5 mt-2 rounded-lg"
              >
                <div className="flex justify-between py-4 ml-2">
                  <div className="info flex items-center justify-between w-full">
                    <div className="flex gap-2">
                      <div className="bg-gradient-to-b from-green-600 to-green-400 w-1 mr-3"></div>
                      <div className="flex items-center dark:text-white">
                        <img
                          src={notification.senderId.profileImageUrl}
                          alt="User"
                          className="h-10 rounded-full dark:text-white"
                        />
                        <div className="flex">
                          <p className="text-gray-800 ms-4 text-xs font-semibold mx-1 dark:text-white">
                            {notification.senderId.username}
                          </p>
                          <p className="text-gray-500 text-xs mx-1 dark:text-gray-400">
                            {notification.message}
                          </p>
                        </div>
                        <p className="text-gray-500 text-xs ms-4 px-2" style={{ fontSize: "9px" }}>
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
