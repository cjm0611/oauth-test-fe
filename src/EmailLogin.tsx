import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiBaseUrl } from "./config";

const EmailLogin = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const encryptedEmail = searchParams.get('email')
        console.log("encryptedEmail: ", encryptedEmail);

        // 백엔드 API 요청
        const processEmailLogin = async () => {
            try {
                const url = `${apiBaseUrl}/api/email-login`;
                const response = await fetch(url, {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ encryptedEmail }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("로그인 성공:", data);
                    // 응답 헤더에서 토큰 추출
                    const accessToken = response.headers.get("AccessToken");
                    const refreshToken = response.headers.get("RefreshToken");

                    console.log("로그인 Access Token:", accessToken);
                    console.log("로그인 Refresh Token:", refreshToken);

                    // 쿠키 설정 완료 후 메인 페이지로 이동
                    navigate("/");
                } else {
                    console.error("로그인 실패:", response.status);
                    // 실패 시 에러 페이지로 이동
                    navigate("/error");
                }
            } catch (error) {
                console.error("API 요청 중 오류 발생:", error);
                navigate("/error");
            }
        };

        processEmailLogin();
      }, [])

    return (
        <div>
            <h1>로그인 중...</h1>
        </div>
    );
};

export default EmailLogin;
