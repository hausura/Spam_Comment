import React, { useState, useEffect } from "react";
import "./Emmbed.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function YoutubeEmbed({ selectedCheckbox, videoId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [results, setResults] = useState([]);
  const [results1, setResults1] = useState([]);
  const API_KEY = "AIzaSyCl0TolqYP5LTHb1YHq9m1omplyIuE-03I";

  const handleGetComments = async () => {
    try {
      const commentResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?key=${API_KEY}&textFormat=plainText&part=snippet&videoId=${videoId}&maxResults=200`
      );
      const commentData = await commentResponse.json();

      if (!commentData.items || commentData.items.length === 0) {
        console.log("No comments found");
        return;
      }

      setComments(
        commentData.items.map((item) => ({
          author: item.snippet.topLevelComment.snippet.authorDisplayName,
          publishedAt: new Date(
            item.snippet.topLevelComment.snippet.publishedAt
          ).toLocaleDateString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          text: item.snippet.topLevelComment.snippet.textDisplay,
        }))
      );
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    console.log(">>>SelectedCheckbox", selectedCheckbox);
  }, [selectedCheckbox]);

  useEffect(() => {
    handleGetComments();
  }, [videoId]);

  useEffect(() => {
    if (comments.length > 0) {
      const fetchAndLog = async () => {
        let commentTexts = comments.map((comment) => comment.text);
        await handleCheck(commentTexts);
      };
      fetchAndLog();
    }
  }, [comments]);

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
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
    setComment("");
  };

  const handleCheck = async (commentTexts) => {
    try {
      const response_lstm = await axios.post(
        "http://127.0.0.1:8000/predict_lstm",
        commentTexts
      );
      const response_ensemble = await axios.post(
        "http://127.0.0.1:8000/predict_SVM",
        commentTexts
      );

      setResults(response_lstm.data.result);
      setResults1(response_ensemble.data.result);

      console.log("LSTM results", response_lstm.data.result);
      console.log("Ensemble results", response_ensemble.data.result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {comments.length > 0 && (
        <div style={{ border: "40px solid #212121" }}>
          <h2>Comments({comments.length})</h2>

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
                type="submit"
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
                    <p>{comment.text}</p>
                    {(results[index] >= 0.5 && selectedCheckbox === 1) ||
                    (results1[index] >= 0.5 && selectedCheckbox === 2) ? (
                      <div>
                      <i className="fas fa-exclamation-circle alert-icon"></i>
                      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>                      </div>
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
