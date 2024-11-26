import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const AdditionalInfo: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState<string | null>(null); // 토큰 저장
  const [ageGroup, setAgeGroup] = useState(""); // 연령대 입력
  const [gender, setGender] = useState(""); // 성별 입력
  const [loading, setLoading] = useState(false);

  // 유효한 ageGroup과 gender 목록
  const validAgeGroups = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"];
  const validGenders = ["MALE", "FEMALE", "OTHER"];

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      console.log("tokenFromUrl: ", tokenFromUrl);
      setToken(tokenFromUrl); // URL에서 토큰 추출 후 저장
    }
  }, [searchParams]);

  const handleSignup = async () => {
    if (!token) {
      alert("토큰이 없습니다. 다시 로그인해주세요.");
      return;
    }
    if (!validAgeGroups.includes(ageGroup)) {
      alert("유효하지 않은 연령대입니다.");
      return;
    }
    if (!validGenders.includes(gender)) {
      alert("유효하지 않은 성별입니다.");
      return;
    }

    setLoading(true);

    // 회원가입 요청
    const url = 'https://grouper-able-dingo.ngrok-free.app/api/signup';

    // const url = 'http://localhost:8080/api/signup';
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token, // 토큰과 함께 전달
        ageGroup,
        gender,
      }),
    })
      .then((response) => {
        console.log("response: ", response);
        if (response.ok) {
          alert("회원가입이 완료되었습니다!");
        } else {
          return response.json().then((data) => {
            alert(`회원가입 실패: ${data.message}`);
          });
        }
      })
      .catch((error) => {
        console.error("회원가입 중 오류:", error);
        alert("회원가입 중 오류가 발생했습니다.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <h1>회원가입</h1>
      {loading ? (
        <p>회원가입 요청 중...</p>
      ) : (
        <>
          <div>
            <label>
              연령대:
              <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}>
                <option value="">선택하세요</option>
                {validAgeGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}대
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              성별:
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">선택하세요</option>
                {validGenders.map((gen) => (
                  <option key={gen} value={gen}>
                    {gen === "MALE" ? "남성" : gen === "FEMALE" ? "여성" : "기타"}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button onClick={handleSignup}>회원가입 완료</button>
        </>
      )}
    </div>
  );
};

export default AdditionalInfo;
