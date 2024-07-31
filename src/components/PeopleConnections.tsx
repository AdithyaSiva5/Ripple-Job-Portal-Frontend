import PeopleCard from "./PeopleCard"
import { useSelector } from "react-redux";
import "../pages/user/userHome/userHome.css"
import { useEffect, useState } from "react";
import { getUserConnection } from "../services/api/user/apiMethods";



function PeopleConnections() {

  const selectUser = (state: any) => state.auth.user;

  const userData = useSelector(selectUser);

  const userId = userData._id;
  const [connections, setConnections] = useState<any>(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    try {
      setLoading(true);

      getUserConnection({ userId })
        .then((response: any) => {
          const connectionData = response.data.connection;
          setConnections(connectionData.connections);
          setLoading(false);
          console.log(response.data.connection);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (loading) {
    return (
      <div className="">
        <div className="flex flex-row flex-wrap gap-x-8 gap-y-0 dark:text-white">
          Loading ...

        </div>

      </div>

    )
  }


  return (
    <div >

      {!connections || connections.length === 0 ? (
        <div >
          <div className="flex flex-row flex-wrap gap-x-8 gap-y-0 mt-10 text-red-600">
            No Connections Available

          </div>

        </div>
      ) : (
        <div className="flex pl-10 flex-row flex-wrap gap-x-20 gap-y-0">
          {connections?.map((user: any) => (

            <PeopleCard user={user} updateConnection={setConnections} />



          ))}
        </div>
      )}
    </div>
  )
}

export default PeopleConnections