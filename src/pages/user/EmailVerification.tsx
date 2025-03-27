import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/constants/url';

const EmailVerification = () => {
  const [verified, setverified] = useState('진행 중');
  useEffect(() => {
    const verifyEmail = async () => {
      const urlParams = new URL(window.location.href);
      const token = urlParams.searchParams.get('token');
      console.log('token:', token);

      if (token) {
        try {
          await axios.post(`${API_URL}/user/verify-email/`, { token });
          setverified('성공');
        } catch (error) {
          console.error('이메일 인증 오류:', error);
          setverified('실패');
        }
      } else {
        setverified('잘못된 접근');
      }
    };

    verifyEmail();
  }, [location.search]);

  return (
    <div>
      <h2>이메일 인증</h2>
      {verified === '진행 중' && <p>인증 진행 중...</p>}
      {verified === '성공' && (
        <p>이메일 인증이 완료되었습니다. 회원가입이 성공적으로 완료되었습니다.</p>
      )}
      {verified === '실패' && <p>이메일 인증에 실패했습니다. 다시 시도해주세요.</p>}
      {verified === '잘못된 접근' && <p>유효한 인증 코드가 없습니다.</p>}
    </div>
  );
};

export default EmailVerification;
