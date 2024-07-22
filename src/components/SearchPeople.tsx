import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { search } from "../services/api/user/apiMethods";
import { useParams, useLocation } from "react-router-dom";
import PeopleCardLarge from "./PeopleCardLarge";
import NoConnections from "./skeletonUI/NoConnections";

function SearchPeople() {
  const selectUser = (state: any) => state.auth.user;
  const userData = useSelector(selectUser);
  const { userId } = useParams();
  const currentUserId = userData._id;
  const [connections, setConnections] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchParamValue = searchParams.get("search");
    setSearchQuery(searchParamValue || "");
  }, [location.search]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchData = async () => {
      try {
        const response: any = await search(searchQuery);
        const connectionData = response.data.users;
        if (isMounted) {
          setConnections(connectionData);
          setLoading(false);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };

    if (searchQuery.trim() !== "") {
      fetchData();
    } else {
      setConnections(null);
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [searchQuery]);
  return (
    <div className="scrollable-container h-[calc(100vh-100px)] overflow-y-auto">
      {loading ? (
        <div className="flex flex-row flex-wrap gap-x-8 gap-y-0 justify-center dark:text-white">
          loading
        </div>
      ) : (
        <div className="flex flex-row flex-wrap gap-x-8 gap-y-0 justify-center">
          {connections?.length > 0 ? (
            connections.map((user: any) => (
              <PeopleCardLarge key={user._id} user={user} updateConnection={setConnections} />
            ))
          ) : (
            <NoConnections />
          )}
        </div>
      )}
    </div>
  );

}

export default SearchPeople;
