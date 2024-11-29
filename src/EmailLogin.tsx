import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiBaseUrl } from "./config";

const EmailLogin = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        // const encryptedEmail = searchParams.get('email')
        // console.log("encryptedEmail: ", encryptedEmail);
        const encryptedEmail = window.location.hash.substring(1); // '#' 이후의 값 추출
        console.log("Encrypted Email from Fragment: ", encryptedEmail);


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
                    // 응답 헤더에서 토큰 추출
                    const accessToken = response.headers.get("AccessToken");
                    const refreshToken = response.headers.get("RefreshToken");

                    console.log("로그인 Access Token:", accessToken);
                    console.log("로그인 Refresh Token:", refreshToken);

                    // // 쿠키 설정 완료 후 메인 페이지로 이동
                    // navigate("/");
                } else {
                    console.error("로그인 실패:", response.status);
                }
            } catch (error) {
                console.error("API 요청 중 오류 발생:", error);
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
