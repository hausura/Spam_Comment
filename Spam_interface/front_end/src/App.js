import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>MooTube</h1>  
            <h2>Check out the TensorFlow.js rap for the show and tell!</h2>        
          <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <iframe width="100%" height="500" src="https://www.youtube.com/embed/RhVs7ijB17c" frameborder="0" allow="autoplay; encrypted-media; allow-presentation" allowfullscreen></iframe>


        <section id="comments" class="comments">
      <div id="comment" class="comment" contenteditable></div>
      <button id="post" type="button">Comment</button>
      <ul id="commentsList">
        <li>
          <span class="username">SomeUser</span>
          <span class="timestamp">2/11/2021, 3:10:00 PM</span>
          <p>Wow, I love this video, so many amazing demos!</p>
        </li>
      </ul>
    </section>
      </header>
    </div>
  );
}

export default App;
