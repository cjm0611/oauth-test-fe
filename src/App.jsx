// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdditionalInfo from './AdditionalInfo';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    // 쿠키 값 읽기
    const cookies = document.cookie.split("; ").reduce((acc, current) => {
      const [key, value] = current.split("=");
      acc[key] = value;
      return acc;
    }, {});

    const accessToken = cookies["AccessToken"];
    const refreshToken = cookies["RefreshToken"];

    // 로그인을 한 경우, 토큰 출력
    // 로그인이 안 된 경우, undefined 출력
    console.log("cookie 안에 있던 Access Token:", accessToken);
    console.log("cookie 안에 있던 Refresh Token:", refreshToken);
  }, []);

  console.log("🎉app 안의 webView인지 확인🎉", window.flutter_inappwebview);
  console.log("🎉🎉🎉", typeof window.flutter_inappwebview);
  
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
