import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import logo_black from '@/assets/logo_black.png';
import { useEffect, useState } from 'react';
import api from '@/api/TokenApi';
import Modal from '@/components/Modal';
import DeleteAccountModal from '@/components/user/DeleteAccountModal';
import useModal from '@/stores/modal';

export default function Profile() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    phone_number: '',
    nickname: '',
    is_social: false,
  });
  const { openModal } = useModal();
  const [editProfile, setEditProfile] = useState(true);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openDeleteAccount = () => {
    openModal(<DeleteAccountModal nickname={userInfo.nickname} />);
  };

  const handleSaveProfile = async () => {
    try {
      const payload = {
        nickname: userInfo.nickname,
        phone_number: userInfo.phone_number,
      };

      // PATCH 요청 실행
      const response = await api.patch('/user/profile/', payload);

      // 성공 시 상태 업데이트 및 읽기 전용 모드로 전환
      setUserInfo((prev) => ({
        ...prev,
        ...response.data,
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
      <div className="flex h-screen items-center justify-center dark:text-black">
        <section className="mb-4 flex w-96 flex-col gap-4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
          <h1 className="flex items-center justify-center">
            <img src={logo_black} alt="한상로고" />
          </h1>
          <h1 className="text-center text-xl font-bold">회원정보</h1>
          <label className="text-sm font-medium">
            이메일
            <p>{userInfo.email}</p>
          </label>
          <label className="text-sm font-medium">
            닉네임
            <Input
              name="nickname"
              type="text"
              value={userInfo.nickname}
              readOnly={editProfile}
              onChange={handleInputChange}
            />
          </label>
          {userInfo.is_social ? (
            <h2>소셜 계정으로 가입된 사용자입니다.</h2>
          ) : (
            <>
              <label className="text-sm font-medium">
                전화번호
                <Input
                  name="phone_number"
                  value={userInfo.phone_number}
                  readOnly={editProfile}
                  onChange={handleInputChange}
                />
              </label>
              <hr />
              {editProfile ? (
                <Button
                  className="text-white dark:bg-[var(--point-orange)]"
                  onClick={() => setEditProfile(false)}
                >
                  회원 정보 수정
                </Button>
              ) : (
                <Button
                  className="bg-[var(--bg-light-point)] text-black hover:text-white"
                  onClick={handleSaveProfile}
                >
                  수정 완료
                </Button>
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
