import { Button } from '../ui/button';

export default function DeleteAccountModal({
  profileImage,
  nickname,
}: {
  profileImage: string;
  nickname: string;
}) {
  return (
    <div>
      <h1>회원 탈퇴</h1>
      <img src={profileImage} alt="" />
      <p>{nickname}</p>
      <p>회원탈퇴를 계속하시려면 '회원탈퇴'를 입력해주세요. </p>
      <input type="text" placeholder="회원탈퇴" />
      <Button className="delete-button">회원탈퇴</Button>
    </div>
  );
}
