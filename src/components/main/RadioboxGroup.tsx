import { FormField, FormLabel, FormItem, FormControl } from '../ui/form';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { UseFormReturn, FieldPath } from 'react-hook-form';
import { Option } from '@/types/ai';

export default function RadioboxGroup<TFormValues extends Record<string, any>>({
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
      render={({ field }) => (
        <FormItem className="space-y-0">
          <FormLabel className="text-base">{label}</FormLabel>
          <FormControl>
            <RadioGroup onValueChange={field.onChange} className="flex rounded-lg border px-2 py-1">
              {options.map((freq) => (
                <FormItem key={freq.id} className="flex grow items-center">
                  <FormControl className="hidden">
                    <RadioGroupItem value={freq.id} />
                  </FormControl>
                  <FormLabel
                    data-state={field.value === freq.id ? 'checked' : 'unchecked'}
                    className="flex w-full items-center justify-center rounded-md py-2.5 font-normal hover:cursor-pointer data-[state=checked]:bg-[var(--point-orange)] dark:data-[state=checked]:text-black"
                  >
                    {freq.label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
