import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function FollowersList() {
  const { username } = useParams();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/followers`
        );
        setFollowers(response.data);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    fetchFollowers();
  }, [username]);

  return (
    <div>
      <h3>Followers of {username}:</h3>
      <ul>
        {followers.map((follower) => (
          <li key={follower.id}>
            <Link to={`/repos/${follower.login}`}>{follower.login}</Link>
          </li>
        ))}
      </ul>
      <Link to={`/repos/${username}`}>Back to Repository List</Link>
    </div>
  );
}

export default FollowersList;
