import { RegisterAttendanceForm } from '@/interfaces/Attendance';
import { FormControl, Textarea } from '@yamada-ui/react';
import { Control, Controller } from 'react-hook-form';

type ContentFieldProps = {
  control: Control<RegisterAttendanceForm>;
};

const ContentField = ({ control }: ContentFieldProps) => {
  return (
    <FormControl label="説明">
      <Controller
        name="description"
        control={control}
        render={({ field }) => <Textarea {...field} placeholder="説明を任意で入力" maxLength={1000} />}
      />
    </FormControl>
  );
};

export default ContentField;
