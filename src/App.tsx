// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdditionalInfo from './AdditionalInfo';

const App: React.FC = () => {

  console.log(typeof window["flutter_inwebappview"]);

  const handleLogin = () => {
    const oauthUrl = "https://grouper-able-dingo.ngrok-free.app/oauth2/authorization/kakao";
    // const oauthUrl = "http://localhost:8080/oauth2/authorization/kakao";
    console.log("oauthUrl: ", oauthUrl);
    window.location.href = oauthUrl;
  };

  return (
    <Router>
      <div className="App">
        <h1>OAuth2 Login Test</h1>
        <button onClick={handleLogin}>Login with OAuth2</button>
        <Routes>
          <Route path="/additional-info" element={<AdditionalInfo />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
