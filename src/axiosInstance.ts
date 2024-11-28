// src/api/axiosInstance.ts
import axios from 'axios';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'https://grouper-able-dingo.ngrok-free.app/api', // 백엔드 API 기본 URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// 응답 인터셉터: 응답 헤더에서 토큰을 추출하여 저장
axiosInstance.interceptors.response.use(
  (response) => {
    const accessToken = response.headers['accesstoken'];
    const refreshToken = response.headers['refreshtoken'];
    console.log("추출된 accessToken: ", accessToken);
    console.log("추출된 refreshToken: ", refreshToken);

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }

    // 웹뷰 환경 감지 및 토큰 전달
    const isWebView = /wv|WebView/i.test(navigator.userAgent);
    if (isWebView && accessToken && refreshToken) {
      if ((window as any).ReactNativeWebView) {
        (window as any).ReactNativeWebView.postMessage(
          JSON.stringify({
            accessToken: accessToken,
            refreshToken: refreshToken,
          })
        );
      }
      // 다른 웹뷰 환경의 경우 추가 처리 필요
    }

    return response;
  },
  (error) => {
    // 응답 에러 처리 (예: 401 Unauthorized)
    return Promise.reject(error);
  }
);

// 요청 인터셉터: 모든 요청에 accessToken을 헤더에 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['accessToken'] = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
