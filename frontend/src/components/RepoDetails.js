import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import './RepoDetails.css';

function RepoDetails() {
  const { username, repoName } = useParams();
  const [repoDetails, setRepoDetails] = useState(null);
  const [readmeContent, setReadmeContent] = useState("");

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        const repoResponse = await axios.get(
          `https://api.github.com/repos/${username}/${repoName}`
        );
        setRepoDetails(repoResponse.data);
      } catch (error) {
        console.error("Error fetching repository details:", error);
      }
    };

    const fetchReadme = async () => {
      try {
        const readmeResponse = await axios.get(
          `https://api.github.com/repos/${username}/${repoName}/readme`,
          { headers: { Accept: "application/vnd.github.v3.raw" } }
        );
        setReadmeContent(readmeResponse.data);
      } catch (error) {
        console.error("Error fetching README:", error);
        setReadmeContent("README not available for this repository.");
      }
    };

    fetchRepoDetails();
    fetchReadme();
  }, [username, repoName]);

  return (
    <div className="repo-details-container">
      {repoDetails ? (
        <>
          <h2>{repoDetails.name}</h2>
          <p><strong>Language:</strong> {repoDetails.language}</p>
          <p><strong>Forks:</strong> {repoDetails.forks_count}</p>
          <p><strong>Stars:</strong> {repoDetails.stargazers_count}</p>
          <p><strong>Created At:</strong> {new Date(repoDetails.created_at).toLocaleDateString()}</p>
          <a href={repoDetails.html_url} target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
          <h3>README:</h3>
          <div className="readme-content">
            <ReactMarkdown>{readmeContent}</ReactMarkdown>
          </div>
        </>
      ) : (
        <p>Loading repository details...</p>
      )}
    </div>
  );
}

export default RepoDetails;
