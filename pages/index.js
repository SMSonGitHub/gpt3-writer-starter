import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';
import { Buffer } from 'buffer';


const Home = () => {


  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...")
    const response = await fetch('api/generate', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)
    

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  const encode = (input) => {
    return btoa(input); //normally return btoa but im tryna update it to buffer
  };

  const saveKey = () => {
    const input = document.getElementById('key_input');

  if (input) {
    const { value } = input;

    // Encode String
    const encodedValue = encode(value);

    // Save to google storage
      brave.storage.local.set({ 'openai-key': encodedValue }, () => {
      document.getElementById('key_needed').style.display = 'none';
      document.getElementById('key_entered').style.display = 'block';
    });
  }
  }

  const changeKey = () => {
    document.getElementById('save_key_button').addEventListener('click', saveKey);
    document.getElementById('change_key_button') .addEventListener('click', changeKey);
  }
    


const onUserChangedText = (event) => {
  console.log(event.target.value);
  setUserInput(event.target.value);
};

  return (
    <div 
    className="root"
    >
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>The Astral Oracle (Alpha 0.1)</h1>
          </div>
          <div className="header-subtitle">
            <h2>Give me a title related to Astrology, and I will write you a blog post about it. (Right now, I only communicate as 2nd century Roman Astrologer Vettius Valens,
              Please be patient with me as I am very new!) </h2>
          </div>
        </div>
        <div className="prompt-container">
  <textarea
    placeholder="Jupiter in the Transit, Through the Houses"
    className="prompt-box"
    value={userInput}
    onChange={onUserChangedText}
  />
  <div className="prompt-buttons">
    <a className="generate-button" onClick={callGenerateEndpoint}>
      <div className="generate">
        <p>Generate</p>
      </div>
    </a>
  </div>
  {/* New code I added here */}
  {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}
</div>
        
      </div>
      {/* <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div> */}
    </div>
  );
};

checkForKey().then((response) => {
  if (response) {
    document.getElementById('key_needed').style.display = 'none';
    document.getElementById('key_entered').style.display = 'block';
  }
});

export default Home;
