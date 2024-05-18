import React, { useState, useEffect } from "react";
import "./Emmbed.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavDropdown } from "react-bootstrap";
import axios from "axios";

function YoutubeEmbed() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [results, setResults] = useState([]);
  const [results1, setResults1] = useState([]);
  const [selectedCheckbox, setSelectedCheckbox] = useState(2);
  const API_KEY = "AIzaSyCl0TolqYP5LTHb1YHq9m1omplyIuE-03I";

  const handleGetComments = async () => {
    let videoId = localStorage.getItem("videoId");

    // Fetch video comments
    const commentResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?key=${API_KEY}&textFormat=plainText&part=snippet&videoId=${videoId}&maxResults=100`
    );
    const commentData = await commentResponse.json();
    setComments(
      commentData.items.map((item) => {
        return {
          author: item.snippet.topLevelComment.snippet.authorDisplayName,
          publishedAt: new Date(
            item.snippet.topLevelComment.snippet.publishedAt
          ).toLocaleDateString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          text: item.snippet.topLevelComment.snippet.textDisplay,
        };
      })
    );
  };

  useEffect(() => {
    handleGetComments();
    const storedCheckbox = localStorage.getItem("selectedCheckbox");
    console.log(">>>SelectedCheckbox");
    if (storedCheckbox) {
      setSelectedCheckbox(Number(storedCheckbox));
    }
  }, [localStorage.getItem("selectedCheckbox")]); // Run only once on mount

  useEffect(() => {
    const fetchAndLog = async () => {
      // Log comments whenever they change
      console.log("Comments:", comments);
      let commentTexts = comments.map((comment) => comment.text);
      handleCheck(commentTexts);
      console.log(">>>.result: ", results);
      console.log(">>>.result1: ", results1);
    };
    fetchAndLog();
  }, [comments]);

  // Handle comments changes
  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    // Add your logic to submit the comment
    console.log("Comment submitted:", comment);
    // Add the new comment to the list of comments
    const newComment = {
      author: "@anonymous",
      publishedAt: currentTime.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      text: comment,
    };
    setComments((prevComments) => [newComment, ...prevComments]);

    // Clear the input field after submitting the comment
    setComment("");
  };

  const handleCheck = async (comments) => {
    try {
      const response_lstm = await axios.post(
        "http://127.0.0.1:8000/predict_lstm",
        comments
      );
      const response_ensemble = await axios.post(
        "http://127.0.0.1:8000/predict_ensemble",
        comments
      );

      setResults(response_lstm.data.result);
      setResults1(response_ensemble.data.result);

      console.log("res results", response_lstm.data.result);
      console.log(response_ensemble.data.result); // Corrected typo here
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {comments.length > 0 && (
        <div style={{ border: "40px solid #212121" }}>
          <h2>Comments</h2>

          <section id="comments" className="comments">
            <div className="comment-section">
              <input
                style={{
                  backgroundColor: "#212121",
                  color: "#ffffff",
                  fontSize: "20px",
                }}
                type="text"
                placeholder="Add a comment..."
                className="youtube-input"
                value={comment}
                onChange={handleInputChange}
              />
              <button
                style={{
                  height: "50px",
                  backgroundColor: "#f0821b",
                  color: "black",
                }}
                onClick={handleCommentSubmit}
                className="youtube-button"
              >
                Comment
              </button>
            </div>

            <ul id="commentsList">
              {comments.map((comment, index) => (
                <li key={index}>
                  <div
                    style={{
                      opacity:
                        (results[index] >= 0.5 && selectedCheckbox === 1) ||
                        (results1[index] >= 0.5 && selectedCheckbox === 2)
                          ? 0.3
                          : 1,
                    }}
                  >
                    <strong className="username">{comment.author}</strong>
                    <span className="timestamp">{comment.publishedAt}</span>
                    <p> {comment.text}</p>
                    {(results[index] >= 0.5 && selectedCheckbox === 1) ||
                    (results1[index] >= 0.5 && selectedCheckbox === 2) ? (
                      <i className="fas fa-exclamation-circle alert-icon"></i>
                    ) : (
                      <></>
                    )}
                    <div>
                      {selectedCheckbox === 1 && (
                        <p>Result: {results[index]}</p>
                      )}
                      {selectedCheckbox === 2 && (
                        <p>Result: {results1[index]}</p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}

export default YoutubeEmbed;
