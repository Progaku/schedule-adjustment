import { RegisterFormData } from '@/interfaces/RegisterFormData';
import { FormControl, Textarea } from '@yamada-ui/react';
import { Control, Controller } from 'react-hook-form';

type ContentFieldProps = {
  control: Control<RegisterFormData>;
};

const ContentField = ({ control }: ContentFieldProps) => {
  return (
    <FormControl label="説明">
      <Controller
        name="content"
        control={control}
        render={({ field }) => <Textarea {...field} placeholder="説明を任意で入力" maxLength={1000} />}
      />
    </FormControl>
  );
};

export default ContentField;
