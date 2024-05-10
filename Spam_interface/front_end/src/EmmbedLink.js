import React, { useState,useEffect } from 'react';
import './Emmbed.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavDropdown } from 'react-bootstrap';
// import Tick from './Tick';


import axios from 'axios';


import logo from './my-icon-M.png';



function YoutubeEmbed() {
  const [videoId, setVideoId] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [results, setResults] = useState([]);
  const [results1, setResults1] = useState([]);

  const [selectedCheckbox, setSelectedCheckbox] = useState(1);




  
  useEffect(() => {
    async function fetch(){
    // Log comments whenever they change
      console.log('Comments:', comments);
      let commentTexts = comments.map(comment => comment.text);
      handleCheck(commentTexts)
      // console.log('Comments text:', commentTexts);
      // await handleCheckboxChange(selectedCheckbox)
      // handleCheck_Ensemble(commentTexts)
      console.log(">>>.result: ",results)
      
    }
    fetch()

  }, [comments]); // Watch for changes in the comments state

  const handleCheckboxChange = async(value) => {
    setSelectedCheckbox(value);
    console.log(selectedCheckbox)

  };
  const checkboxes = [
    { id: 1, label: 'LSTM - CNN' },
    { id: 2, label: 'Ensemble' },
  ];



//   Handle comments changes
  const handleInputChange = (event) => {
    setComment(event.target.value);
  };
  const handleCommentSubmit = () => {
    // Add your logic to submit the comment
    console.log('Comment submitted:', comment);
    // Add the new comment to the list of comments
    const newComment = {
        author:'@anonymous',
        publishedAt: currentTime.toLocaleTimeString(undefined,{ hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        text: comment
    };
    setComments(prevComments => [newComment,...prevComments]);
    

    // Clear the input field after submitting the comment
    setComment('');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_KEY='AIzaSyCQWFFYxyeYtvgONwlc73aRg9WLz46RFgU';
    try {
      setEmbedUrl(`https://www.youtube.com/embed/${videoId}`);

      // Fetch video comments
      const commentResponse = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?key=${API_KEY}&textFormat=plainText&part=snippet&videoId=${videoId}&maxResults=100`);
      const commentData = await commentResponse.json();
      setComments(commentData.items.map(item => {
        return {
          author: item.snippet.topLevelComment.snippet.authorDisplayName,
          publishedAt:new Date(item.snippet.topLevelComment.snippet.publishedAt).toLocaleDateString(undefined,{ hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          text: item.snippet.topLevelComment.snippet.textDisplay
        };
      }));


    } catch (error) {
      console.error('Error fetching video details:', error);
    }
  };

  

  const handleCheck = async (comments) => {
    try {

        const response_lstm = await axios.post('http://127.0.0.1:8000/predict_lstm', comments);
        const response_ensemble = await axios.post('http://127.0.0.1:8000/predict_ensemble', comments);

        setResults(response_lstm.data.result);
        setResults1(response_ensemble.data.result);
        
        console.log('res results',response_lstm.data.result);
        console.log(response_ensemble.data.result); // Corrected typo here
        


    } catch (error) {
      console.error('Error:', error);
    }
  };

  const IconAlert = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-alert-triangle"
    >
      <path d="M12 9v4m0 4h0"></path>
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M10 7L12 9L14 7"></path>
      <path d="M12 17.25v.75"></path>
    </svg>
  );

  function ResultCpmponent({ selectedCheckbox, results1, results, index }) {
    // Kiểm tra giá trị của selectedCheckbox
    let resultToDisplay;
    if (selectedCheckbox === 1) {
      // Nếu selectedCheckbox === 1, hiển thị kết quả từ results1
      resultToDisplay = results[index];
    } else {
      // Nếu selectedCheckbox không phải là 1, mặc định hiển thị kết quả từ results2
      resultToDisplay = results1[index];
    }
  
    // Trả về phần tử JSX để hiển thị kết quả tương ứng
    return (
      <div>
        <p>Result: {resultToDisplay}</p>
      </div>
    );
  }

  
  return (
    <div style={{ backgroundColor: '#212121' , color: '#ffffff'}} >
            <nav class="navbar" style={{ display: 'flex' ,position:'fixed', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
            <div>
            <a style={{textDecoration: "none",color:'#ffffff',display:'flex'}}  href="/" >
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
            





            <form onSubmit={handleSubmit} className='navbar-right'>
            <NavDropdown  className='youtube-button' title="Models" id="basic-nav-dropdown" style={{color: 'black',  backgroundColor:'#f0821b'}}>
              <NavDropdown.Item href="#action/3.1">


              </NavDropdown.Item>
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
                style={{ backgroundColor: 'transparent', border:'none',marginRight: '10px',width:'150px', color:'white'  }}
                type="text" 
                placeholder="Enter Video ID " 
                value={videoId} 
                onChange={(e) => setVideoId(e.target.value)} 
                />

                <i className="search-icon fas fa-search" style={{right:'150px',position: 'absolute',color: 'rgba(170, 170, 170, 0.5)'}}></i>

                <button className='youtube-button' type="submit" style={{ backgroundColor:'#f0821b', color:'black'}}>Embed Video</button>
            </form>
            </nav>


      
      {embedUrl && (
        <div style={{ borderTop: '100px solid #212121'}}>
          <iframe 
            src={embedUrl} 
            title="Embedded YouTube Video" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      )}

      {comments.length > 0 && (
        <div style={{ border: '40px solid #212121'}}>
          <h2>Comments</h2>

          <section id="comments" class="comments">


          <div className="comment-section">
      <input
        style={{ backgroundColor: '#212121',color: '#ffffff',fontSize:'20px' }}
        type="text"
        placeholder="Add a comment..."
        className="youtube-input"
        value={comment}
        onChange={handleInputChange}
      />
      <button style={{ height : '50px', backgroundColor:'#f0821b', color:'black'}} onClick={handleCommentSubmit} className="youtube-button">Comment</button>
      </div>

            <ul id="commentsList">
            {comments.map((comment, index) => (
              <li key={index}>
                <div style={{ opacity: (results[index] >= 0.5 & selectedCheckbox === 1)|(results1[index] >= 0.5 & selectedCheckbox === 2)   ? 0.3 : 1 }}>
                <strong class="username">{comment.author}</strong> 
                <span class="timestamp">{comment.publishedAt}</span>
                <p> {comment.text}</p>
                {(results[index] >= 0.5 & selectedCheckbox === 1)|(results1[index] >= 0.5 & selectedCheckbox === 2) ?  <i className="fas fa-exclamation-circle alert-icon"></i> : <></>}
                <p> {ResultCpmponent({ selectedCheckbox, results1, results, index })}</p>
                {/* {results[index] === 1 &&  <i className="search-icon fas fa-search" style={{right:'150px',position: 'absolute',color: 'rgba(170, 170, 170, 0.5)'}}></i>} */}
                {/* <button onClick={() => handleCheck(comments)}>Check</button> */}
                {/* <>RESULT: {results1[index]}</>
                <>RESULT: {results[index]}</> */}

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
