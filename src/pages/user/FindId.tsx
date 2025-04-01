import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { useState } from 'react';

export default function FindId() {
  // const [phoneNumber,setPhoneNumber]=useState('')
  // const [email,setEmail]=useState('')

  // const handleFindId = async ()=>{
  //   if()
  // }

  return (
    <main className="flex flex-col items-center justify-center pt-[100px] pl-[200px]">
      <section className="flex max-w-5xl flex-col gap-4">
        <img src="" alt="한상비서로고" />
        <h1>아이디 찾기</h1>
        <label>
          휴대폰 번호(숫자만 입력)
          <Input type="tel" placeholder="0100001234" />
        </label>
        <Button>본인인증</Button>
      </section>
    </main>
  );
}
//모달로 아이디와 가입일 띄우기
