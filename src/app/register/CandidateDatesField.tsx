import { RegisterFormData } from '@/interfaces/RegisterFormData';
import { MultiDatePicker } from '@yamada-ui/calendar';
import { FormControl, Text } from '@yamada-ui/react';
import { Control, Controller } from 'react-hook-form';

type CandidateDatesFieldProps = {
  control: Control<RegisterFormData>;
};

const CandidateDatesField = ({ control }: CandidateDatesFieldProps) => {
  return (
    <FormControl required label="候補日">
      <Text fontSize="sm" color="gray.500" mb={2}>
        今日以降で2日以上
      </Text>
      <Controller
        name="candidate_dates"
        control={control}
        rules={{
          validate: (value) => value.length >= 2,
        }}
        render={({ field }) => (
          <MultiDatePicker
            {...field}
            placeholder="YYYY/MM/DD"
            minDate={new Date()}
            locale="ja"
            onChange={(dates) => field.onChange(dates)}
            today
          />
        )}
      />
    </FormControl>
  );
};

export default CandidateDatesField;
