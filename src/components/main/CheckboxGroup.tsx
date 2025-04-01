import { FormControl, FormField, FormLabel, FormItem } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn, FieldPath } from 'react-hook-form';
import { Option } from '@/types/ai';

export default function CheckboxGroup<TFormValues extends Record<string, any>>({
  form,
  options,
  optionName,
  label,
}: {
  form: UseFormReturn<TFormValues>;
  options: readonly Option[];
  optionName: FieldPath<TFormValues>;
  label: string;
}) {
  return (
    <FormField
      control={form.control}
      name={optionName}
      render={() => (
        <FormItem>
          <div>
            <FormLabel className="text-base">{label}</FormLabel>
            {/* <FormDescription>설명</FormDescription> */}
          </div>
          <div className="flex gap-2 rounded-lg border px-2 py-1">
            {options.map((type) => (
              <FormField
                key={type.id}
                control={form.control}
                name={optionName}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <FormItem className="flex grow items-center">
                      <FormControl className="hidden">
                        <Checkbox
                          checked={field.value?.includes(type.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, type.id])
                              : field.onChange(
                                  field.value?.filter((value: string) => value !== type.id),
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel
                        data-state={field.value?.includes(type.id) ? 'checked' : 'unchecked'}
                        className="flex w-full items-center justify-center rounded-md py-2.5 font-normal hover:cursor-pointer data-[state=checked]:bg-[var(--point-orange)] dark:data-[state=checked]:text-black"
                      >
                        {type.label}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  );
}
