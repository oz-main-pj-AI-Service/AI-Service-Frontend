import { FormControl, FormField, FormLabel } from '@/components/ui/form';
import { FormItem } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import { Option } from '@/types/ai';

export default function CheckboxGroup({
  form,
  options,
  optionName,
  label,
}: {
  form: UseFormReturn<any>;
  options: readonly Option[];
  optionName: string;
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
          <div className="flex gap-4">
            {options.map((type) => (
              <FormField
                key={type.id}
                control={form.control}
                name={optionName}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                      <FormLabel className="text-sm">
                        <FormControl>
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
