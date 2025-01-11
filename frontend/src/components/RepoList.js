import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import './RepoList.css';
import axios from "axios";


function RepoList() {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [repos, setRepos] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [error, setError] = useState(null);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  const githubToken = process.env.REACT_APP_GITHUB_TOKEN;
  console.log(process.env.REACT_APP_GITHUB_TOKEN);
  // Function to delete user data from the database
  const deleteUserData = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${username}`);
      alert("User data deleted successfully");
      window.location.href = '/';
    } catch (err) {
      console.error("Error deleting user data:", err);
      alert("Error deleting user data");
    }
  };

  useEffect(() => {
    // Save user data to DB
    const saveUserToDB = async (userData) => {
      try {
        await axios.post("http://localhost:5000/api/users", userData);
      } catch (error) {
        console.error("Error saving user data to DB:", error);
      }
    };

    // Fetch user, repos, followers, and following data from GitHub
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`https://api.github.com/users/${username}`, {
          headers: {
            Authorization: `Bearer ${githubToken}`
          }
        });
        setUserInfo(userResponse.data);

        const reposResponse = await axios.get(userResponse.data.repos_url, {
          headers: {
            Authorization: `Bearer ${githubToken}`
          }
        });
        setRepos(reposResponse.data);

        const followersResponse = await axios.get(userResponse.data.followers_url, {
          headers: {
            Authorization: `Bearer ${githubToken}`
          }
        });
        setFollowers(followersResponse.data);

        const followingResponse = await axios.get(userResponse.data.following_url.split('{')[0], {
          headers: {
            Authorization: `Bearer ${githubToken}`
          }
        });
        setFollowing(followingResponse.data);

        // Save user data to DB if successful fetch from GitHub
        await saveUserToDB({
          username: userResponse.data.login,
          name: userResponse.data.name,
          avatar_url: userResponse.data.avatar_url,
          bio: userResponse.data.bio,
          location: userResponse.data.location,
          public_repos: userResponse.data.public_repos,
          followers: userResponse.data.followers,
          following: userResponse.data.following,
          profile_url: userResponse.data.html_url,
        });
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("User not found on GitHub.");
        } else {
          setError("Error fetching user data. Please try again later.");
        }
        console.error(err);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div className="container">
      {error && <p className="error">{error}</p>}
      {userInfo && (
        <div className="user-info">
          <img src={userInfo.avatar_url} alt={`${username}'s avatar`} className="avatar" />
          <h2>{userInfo.name} (@{userInfo.login})</h2>
          <p>Bio: {userInfo.bio || "No bio available"}</p>
          <p>Location: {userInfo.location || "Not available"}</p>
          <p>Public Repositories: {userInfo.public_repos}</p>
          <button onClick={deleteUserData} className="profile-link">
            Delete this user
          </button>
        </div>
      )}

      <div className="follow-info">
        <button onClick={() => setShowFollowersModal(true)}>
          View Followers ({userInfo?.followers})
        </button>
        <button onClick={() => setShowFollowingModal(true)}>
          View Following ({userInfo?.following})
        </button>
      </div>

      <h3>Repositories:</h3>
      <ul className="repo-list">
        {repos.map((repo) => (
          <li key={repo.id} className="repo-item">
            <Link to={`/repo/${username}/${repo.name}`}>{repo.name}</Link>
          </li>
        ))}
      </ul>

      <Link to="/" className="back-link">Go Back</Link>

      {/* Followers Modal */}
      {showFollowersModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowFollowersModal(false)}>&times;</span>
            <h2>Followers</h2>
            <ul className="followers-list">
              {followers.map(follower => (
                <li key={follower.id}>{follower.login}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Following Modal */}
      {showFollowingModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowFollowingModal(false)}>&times;</span>
            <h2>Following</h2>
            <ul className="following-list">
              {following.map(followingUser => (
                <li key={followingUser.id}>{followingUser.login}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default RepoList;
