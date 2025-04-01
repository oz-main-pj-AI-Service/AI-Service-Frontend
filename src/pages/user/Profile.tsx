import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import 한상로고 from '@/assets/한상로고.png';
import { useEffect, useState } from 'react';
import api from '@/api/TokenApi';
import Modal from '@/components/Modal';
import DeleteAccountModal from '@/components/user/DeleteAccountModal';
import 기본프로필 from '@/assets/기본프로필.png';
import useModal from '@/stores/modal';

export default function Profile() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    phone_number: '',
    profile_image: '',
    nickname: '',
    is_social: false,
  });
  const { openModal } = useModal();
  const [editProfile, setEditProfile] = useState(true);
  console.log(editProfile);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openDeleteAccount = () => {
    openModal(
      <DeleteAccountModal profileImage={userInfo.profile_image} nickname={userInfo.nickname} />,
    );
  };

  const handleSaveProfile = async () => {
    try {
      // 변경된 필드만 전송
      const payload = {
        nickname: userInfo.nickname,
        phone_number: userInfo.phone_number,
      };

      // PATCH 요청 실행
      const response = await api.patch('/user/profile/', payload);

      // 성공 시 상태 업데이트 및 읽기 전용 모드로 전환
      setUserInfo((prev) => ({
        ...prev,
        ...response.data, // 서버에서 반환된 업데이트된 데이터 적용
      }));
      setEditProfile(true);
      alert('프로필이 성공적으로 수정되었습니다! 🎉');
    } catch (error) {
      console.error('프로필 수정 실패:', error);
      alert('수정에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/user/profile/');
        const userProfile = response.data;
        console.log('응답', response);
        setUserInfo({
          email: userProfile.email || '',
          phone_number: userProfile.phone_number || '',
          profile_image: userProfile.profile_image || '',
          nickname: userProfile.nickname || '',
          is_social: userProfile.is_social,
        });
      } catch (error) {
        console.error('프로필 정보 가져오기 실패:', error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-14 pl-[200px]">
      <div className="flex h-screen items-center justify-center">
        <section className="mb-4 flex w-96 flex-col gap-4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
          <h1>
            <img src={한상로고} alt="한상로고" />
          </h1>
          <h1>회원정보</h1>
          <img src={userInfo.profile_image || 기본프로필} alt="프로필사진" className="h-16 w-16" />
          <p>이메일 </p>
          <p>{userInfo.email}</p>
          <p>닉네임</p>
          <Input
            name="nickname"
            type="text"
            value={userInfo.nickname}
            readOnly={editProfile}
            onChange={handleInputChange}
          />
          {userInfo.is_social ? (
            <h2>소셜 계정으로 가입된 사용자입니다.</h2>
          ) : (
            <>
              <p>전화번호 </p>
              <Input
                name="phone_number"
                value={userInfo.phone_number}
                readOnly={editProfile}
                onChange={handleInputChange}
              />
              <hr />
              {editProfile ? (
                <Button onClick={() => setEditProfile(false)}>회원 정보 수정</Button>
              ) : (
                <Button onClick={handleSaveProfile}>수정 완료</Button>
              )}
            </>
          )}

          <Button onClick={openDeleteAccount}>회원탈퇴</Button>
        </section>
      </div>
      <Modal />
    </main>
  );
}
