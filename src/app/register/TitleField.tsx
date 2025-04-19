import { RegisterFormData } from '@/interfaces/RegisterFormData';
import { FormControl, Input } from '@yamada-ui/react';
import { Control, Controller } from 'react-hook-form';

type TitleFieldProps = {
  control: Control<RegisterFormData>;
};

const TitleField = ({ control }: TitleFieldProps) => {
  return (
    <FormControl required label="タイトル" helperMessage="128文字以内">
      <Controller
        name="title"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input {...field} placeholder="入力内容" maxLength={128} onChange={(e) => field.onChange(e.target.value)} />
        )}
      />
    </FormControl>
  );
};

export default TitleField;
