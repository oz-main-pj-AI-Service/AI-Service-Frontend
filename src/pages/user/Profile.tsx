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
  const [editProfile, setEditProfile] = useState(false);

  const openDeleteAccount = () => {
    openModal(
      <DeleteAccountModal profileImage={userInfo.profile_image} nickname={userInfo.nickname} />,
    );
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
          <p>닉네임</p>
          <Input type="text" value={userInfo.nickname} readOnly />
          <p>이메일 </p>
          <Input value={userInfo.email} readOnly={editProfile} />
          {userInfo.is_social ? (
            <h2>소셜 계정으로 가입된 사용자입니다.</h2>
          ) : (
            <>
              <p>전화번호 </p>
              <Input value={userInfo.phone_number} readOnly={editProfile} />
              <hr />
              <Button onClick={() => setEditProfile(true)}>회원 정보 수정</Button>
            </>
          )}
          <Button onClick={openDeleteAccount}>회원탈퇴</Button>
        </section>
      </div>
      <Modal />
    </main>
  );
}
