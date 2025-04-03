import { Link, useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { User } from '@/types/user';
import { useAdminUserDetailQuery, useAdminUserEditQuery } from '@/hooks/useAdminQuery';
import { useEffect, useState } from 'react';
import Modal from '@/components/Modal';

export default function AdminUsersEdit() {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  // 특정 사용자 정보 조회 api 호출 (쿼리 or 서스펜스쿼리)
  const { data: user } = useAdminUserDetailQuery(id);
  console.log(user);

  // 특정 사용자 정보 수정 api 호출 (뮤테이션)
  // api/user/admin/id/
  const editMutation = useAdminUserEditQuery(id);
  const [isSubmitModalOn, setIsSubmitModalOn] = useState<boolean>(false);

  // 이것도 나중에 디폴트 값 유즈이펙트안에서 넣어주기
  const form = useForm<User>({
    // 유효성 검사
    // resolver: zodResolver(reportFormSchema),
  });

  // 데이터 타입 유저에서 ? 설정해줘야 하는게 뭐가 더 있는지 확인
  const onSubmit = (data: User) => {
    console.log(data);

    // 수정 눌렀을 때 api 호출

    // 모달 (확인, 취소 둘 다 확인 눌렀을때 현재 유저 정보 페이지로 네비게이팅)
    navigate(`/admin/users/${id}`);
  };

  useEffect(() => {
    form.reset({
      nickname: user?.nickname ?? '',
      phone_number: user?.phone_number ?? '',
      email_verified: user?.email_verified ?? false,
      status: user?.is_active ? 'ACTIVE' : 'INACTIVE',
    });
  }, [user]);

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-16 max-md:pb-20 min-lg:pl-[200px]">
      <div className="flex w-full flex-1 items-center">
        <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-2xl font-bold">유저 정보 수정</h2>
            {/* 취소 확인 모달 띄우기 */}
            <Link to="/admin/users">
              <Button variant="outline">유저 목록 보기</Button>
            </Link>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem className="flex justify-between gap-2">
                    <FormLabel className="w-1/4">유저네임</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="유저네임을 입력하세요."
                        {...field}
                        className="text-right"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem className="flex justify-between gap-2">
                    <FormLabel className="w-1/4">전화번호</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="전화번호를 입력하세요."
                        className="text-right"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email_verified"
                render={({ field }) => (
                  <FormItem className="flex justify-between gap-2">
                    <FormLabel className="w-1/4">이메일 인증 여부</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex justify-between gap-2">
                    <FormLabel className="w-1/4">상태</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="상태를 선택하세요." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ACTIVE">활성</SelectItem>
                        <SelectItem value="INACTIVE">비활성</SelectItem>
                        <SelectItem value="SUSPENDED">정지</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* 더 필요한 항목 추가하기 */}

              <div className="flex justify-between gap-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => navigate(`/admin/users/${id}`)}
                  className="grow"
                >
                  취소
                </Button>
                <Button type="submit" className="grow">
                  수정
                </Button>
              </div>
            </form>
          </Form>

          {/* submit 모달 */}
          <Modal
            isOpen={isSubmitModalOn}
            content={
              <div className="flex flex-col gap-8 py-2">
                <p>수정 하시겠습니까?</p>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsSubmitModalOn(false)}
                    className="w-20"
                  >
                    취소
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (user) {
                        editMutation.mutate(user);
                        navigate('/admin/users');
                      }
                    }}
                    className="w-20"
                  >
                    수정
                  </Button>
                </div>
              </div>
            }
            closeModal={() => setIsSubmitModalOn(false)}
          />
        </section>
      </div>
    </main>
  );
}
