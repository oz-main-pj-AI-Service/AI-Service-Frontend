// import { UserToken } from '@/types/user';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

export default function Menu() {
  // const [userToken, setUserToken] = useState<UserToken | null>(null);

  // 로그인 테스트 (없는 계정 - 400 나와야 성공)
  // useEffect(() => {
  //   const getUserToken = async () => {
  //     axios
  //       .post('http://43.201.146.129/api/user/login', {
  //         email: 'test@test.com',
  //         password: '4321',
  //       })
  //       .then((res) => {
  //         console.log(res);
  //         setUserToken(res.data);
  //       });
  //   };
  //   getUserToken();
  // }, []);
  // console.log(user);

  // 회원 가입 테스트 (201 나와야 성공)
  // useEffect(() => {
  //   const getUserToken = async () => {
  //     axios
  //       .post('http://43.201.146.129/api/user/register', {
  //         email: 'test@test.com',
  //         password: '4321',
  //       })
  //       .then((res) => {
  //         console.log(res);
  //         setUserToken(res.data);
  //       });
  //   };
  //   getUserToken();
  // }, []);
  // console.log(userToken);

  return (
    <main className="flex justify-center pl-[200px]">
      <section className="max-w-5xl">
        <h2>조건 넣고 메뉴 추천받기</h2>
      </section>
    </main>
  );
}
