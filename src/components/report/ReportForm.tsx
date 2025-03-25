import { Link } from 'react-router';
import { Form, FormField, FormControl, FormItem, FormLabel } from '../ui/form';
import { SelectValue, SelectTrigger, SelectContent, SelectItem, Select } from '../ui/select';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { UseFormReturn } from 'react-hook-form';
import { ReportFormInput } from '@/types/report';

export default function ReportForm({
  form,
  onSubmit,
  submitText,
}: {
  form: UseFormReturn<ReportFormInput>;
  onSubmit: (data: ReportFormInput) => void;
  submitText: string;
}) {
  return (
    <main className="flex h-full w-full flex-col overflow-y-auto pt-14 pl-[200px]">
      <div className="flex w-full flex-1 items-center">
        <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-2xl font-bold">문의하기</h2>
            <Link to="/report">
              <Button variant="outline">나의 문의 사항 목록 보기</Button>
            </Link>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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

              <Button type="submit">{submitText}</Button>
            </form>
          </Form>
        </section>
      </div>
    </main>
  );
}
