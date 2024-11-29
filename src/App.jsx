// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdditionalInfo from './AdditionalInfo';
import EmailLogin from './EmailLogin';
import { apiBaseUrl } from './config';

const App = () => {
  console.log("🎉app 안의 webView인지 확인🎉", window.flutter_inappwebview);
  console.log("🎉🎉🎉", typeof window.flutter_inappwebview);
  
  const handleLogin = () => {
    const oauthUrl = `${apiBaseUrl}/oauth2/authorization/kakao`;
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
        <Route path="/email-login" element={<EmailLogin />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
