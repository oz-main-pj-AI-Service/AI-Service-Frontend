import { API_URL } from '@/constants/url';
import { UserToken } from '@/types/user';
import axios from 'axios';
// import { useEffect, useState } from 'react';

export const loginApiTemp = {
  logIn: async () => {
    const response = await axios.post<UserToken>(`${API_URL}/user/login/`, {
      email: 'test@test.com',
      password: '!!test1234',
    });
    const userToken = response.data;
    return userToken;
  },

  getAccessTokenTemp: () => {
    return localStorage.getItem('access_temp');
  },
};

// const [userToken, setUserToken] = useState<UserToken | null>(null);

// 로그인 테스트 (없는 계정 - 400 나와야 성공)
// useEffect(() => {
//   const getUserToken = async () => {
//     axios
//       .post('http://43.201.146.129/api/user/login/', {
//         email: 'asdfqw1@test.com',
//         password: '!!test1234',
//       })
//       .then((res) => {
//         console.log(res);
//         setUserToken(res.data);
//       });
//   };
//   getUserToken();
// }, []);
// console.log(userToken);

// // 회원 가입 테스트 (201 나와야 성공)
// useEffect(() => {
//   const getUserToken = async () => {
//     axios
//       .post('http://43.201.146.129/api/user/register/', {
//         email: 'asdfqw1@test.com',
//         password1: '!!test1234',
//         password2: '!!test1234',
//         nickname: 'test',
//         phone_number: '01043218755',
//       })
//       .then((res) => {
//         console.log(res);
//         setUserToken(res.data);
//       });
//   };
//   getUserToken();
// }, []);
// console.log(userToken);
