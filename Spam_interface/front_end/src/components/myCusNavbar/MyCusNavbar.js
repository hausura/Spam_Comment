import React, { useEffect } from "react";
import { useState } from "react";
import logo from "../../assets/my-icon-M.png";
import { NavDropdown } from "react-bootstrap";
import "./MyCusNavbar.css";
import YoutubeEmbed from "../cmt/EmmbedLink";

const MyCusNavbar = () => {
  const [videoId, setLinkVideo] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [selectedCheckbox, setSelectedCheckbox] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.setItem("videoId", videoId);
      setEmbedUrl(`https://www.youtube.com/embed/${videoId}`);
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };

  // Handle selectedCheckbox state
  const handleCheckboxChange = async (value) => {
    localStorage.setItem("selectedCheckbox", value);
    setSelectedCheckbox(value);
    console.log(selectedCheckbox);
  };
  const checkboxes = [
    { id: 1, label: "LSTM - CNN" },
    { id: 2, label: "Ensemble" },
  ];
  // useEffect({}, [localStorage]);

  return (
    <div style={{ backgroundColor: "#212121", color: "#ffffff" }}>
      <nav
        class="navbar"
        style={{
          display: "flex",
          position: "fixed",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <div>
          <a
            style={{
              textDecoration: "none",
              color: "#ffffff",
              display: "flex",
            }}
            href="/"
          >
            <img
              src={logo}
              width="80"
              height="70"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            <h1>MeTUBE</h1>
          </a>
        </div>

        <form onSubmit={handleSubmit} className="navbar-right">
          <NavDropdown
            className="youtube-button"
            title="Models"
            id="basic-nav-dropdown"
            style={{ color: "black", backgroundColor: "#f0821b" }}
          >
            <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
            {checkboxes.map((checkbox) => (
              <div key={checkbox.id}>
                <input
                  type="checkbox"
                  id={checkbox.id}
                  checked={selectedCheckbox === checkbox.id}
                  onChange={() => handleCheckboxChange(checkbox.id)}
                />
                <label htmlFor={checkbox.id}>{checkbox.label}</label>
              </div>
            ))}
          </NavDropdown>

          <input
            style={{
              backgroundColor: "transparent",
              border: "none",
              marginRight: "auto",
              marginLeft: "auto",
              width: "150px",
              color: "white",
            }}
            type="text"
            placeholder="Enter Video ID "
            value={videoId}
            onChange={(e) => setLinkVideo(e.target.value)}
          />

          <i
            className="search-icon fas fa-search"
            style={{
              right: "150px",
              position: "absolute",
              color: "rgba(170, 170, 170, 0.5)",
            }}
          ></i>

          <button
            className="youtube-button"
            type="submit"
            style={{ backgroundColor: "#f0821b", color: "black" }}
          >
            Embed Video
          </button>
        </form>
      </nav>

      {embedUrl && (
        <div style={{ borderTop: "100px solid #212121" }}>
          <iframe
            src={embedUrl}
            title="Embedded YouTube Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <YoutubeEmbed
            style={{ display: "none" }}
            selectedCheckbox={selectedCheckbox}
            videoId={videoId}
          />
        </div>
      )}
    </div>
  );
};

export default MyCusNavbar;
