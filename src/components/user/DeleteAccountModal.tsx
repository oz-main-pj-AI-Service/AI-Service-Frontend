import api from '@/api/TokenApi';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';

export default function DeleteAccountModal({
  profileImage,
  nickname,
}: {
  profileImage: string;
  nickname: string;
}) {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { clearAuth } = useAuthStore();

  const handleDeleteAccount = async () => {
    if (inputValue !== '회원탈퇴') {
      setErrorMessage("'회원탈퇴'를 정확히 입력해주세요");
      return;
    }

    try {
      await api.delete('/user/profile/');
      clearAuth();
      alert('회원탈퇴가 완료되었습니다');
      window.location.href = '/';
    } catch (error) {
      setErrorMessage('회원탈퇴 요청이 실패했습니다. 다시 요청해주세요');
    }
  };
  return (
    <div>
      <h1>회원 탈퇴</h1>
      <img src={profileImage} alt="" />
      <p>{nickname}</p>
      <p>회원탈퇴를 계속하시려면 '회원탈퇴'를 입력해주세요. </p>
      <input
        type="text"
        placeholder="회원탈퇴"
        className="border"
        onChange={(e) => {
          setInputValue(e.target.value);
          setErrorMessage('');
        }}
      />
      <p>{errorMessage}</p>
      <Button className="delete-button" onClick={handleDeleteAccount}>
        회원탈퇴
      </Button>
    </div>
  );
}
