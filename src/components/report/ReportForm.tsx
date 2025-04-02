import { useState } from 'react';
import { Form, FormField, FormControl, FormItem, FormLabel } from '../ui/form';
import { SelectValue, SelectTrigger, SelectContent, SelectItem, Select } from '../ui/select';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { UseFormReturn } from 'react-hook-form';
import { ReportFormInput } from '@/types/report';
import Modal from '../Modal';

export default function ReportForm({
  form,
  onSubmit,
  onCancel,
  submitText,
}: {
  form: UseFormReturn<ReportFormInput>;
  onSubmit: (data: ReportFormInput) => void;
  onCancel: () => void;
  submitText: string;
}) {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto max-md:pb-20 min-md:pt-16 min-lg:pl-[200px]">
      <div className="flex w-full flex-1 items-center">
        <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-2xl font-bold">문의하기</h2>
            <Button variant="outline" onClick={() => setIsCancelModalOpen(true)}>
              나의 문의 사항 목록 보기
            </Button>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>제목</FormLabel>
                    <FormControl>
                      <Input placeholder="제목을 입력하세요." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>유형</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="유형을 선택하세요." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ERROR">오류</SelectItem>
                        <SelectItem value="QUESTION">문의</SelectItem>
                        <SelectItem value="FEATURE_REQUEST">기능 요청</SelectItem>
                        <SelectItem value="OTHER">기타</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>내용</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="내용을 입력하세요."
                        className="min-h-60 resize-none"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="button" onClick={() => setIsSubmitModalOpen(true)}>
                {submitText}
              </Button>
            </form>
          </Form>

          {/* 목록으로 돌아가기 모달 */}
          <Modal
            isOpen={isCancelModalOpen}
            content={
              <div className="flex flex-col gap-8 py-2">
                <p>취소 하시겠습니까?</p>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsCancelModalOpen(false)}
                    className="w-20"
                  >
                    취소
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      onCancel();
                      setIsCancelModalOpen(false);
                    }}
                    className="w-20"
                  >
                    확인
                  </Button>
                </div>
              </div>
            }
            closeModal={() => setIsCancelModalOpen(false)}
          />

          {/* submit 모달 */}
          <Modal
            isOpen={isSubmitModalOpen}
            content={
              <div className="flex flex-col gap-8 py-2">
                <p>{submitText} 하시겠습니까?</p>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="w-20"
                  >
                    취소
                  </Button>
                  <Button
                    onClick={() => {
                      form.handleSubmit(onSubmit)();
                      setIsSubmitModalOpen(false);
                    }}
                    className="w-20"
                  >
                    {submitText}
                  </Button>
                </div>
              </div>
            }
            closeModal={() => setIsSubmitModalOpen(false)}
          />
        </section>
      </div>
    </main>
  );
}
