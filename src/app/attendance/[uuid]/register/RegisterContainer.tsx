'use client';

import { useRegisterParticipant } from '@/hooks/api';
import { RegisterParticipantForm } from '@/interfaces/Attendance';
import { attendanceAtom } from '@/store';
import { Button, FormControl, HStack, Input, SegmentedControl, SegmentedControlButton } from '@yamada-ui/react';
import { useAtom } from 'jotai/index';
import { redirect, useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

const RegisterContainer = ({ uuid }: { uuid: string }) => {
  const [attendance, _setAttendance] = useAtom(attendanceAtom);
  const router = useRouter();
  const {
    getValues,
    control,
    formState: { isValid },
  } = useForm<RegisterParticipantForm>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      params: {},
    },
  });
  const routingDetail = () => {
    router.push(`attendance/${uuid}`);
  };
  const onClickRegisterButton = async () => {
    const inputValues = getValues();
    const params = Object.entries(inputValues.params).map(([key, value]) => ({
      date: key,
      status: value,
    }));
    params.sort((a, b) => a.date.localeCompare(b.date));
    await useRegisterParticipant(uuid, {
      name: inputValues.name,
      params,
    });
    routingDetail();
  };
  if (!attendance || attendance.candidateDate.length === 0) {
    redirect('/');
    return;
  }
  return (
    <div className="flex flex-col gap-3">
      <FormControl required label="名前">
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input {...field} placeholder="入力内容" maxLength={128} onChange={(e) => field.onChange(e.target.value)} />
          )}
        />
      </FormControl>
      <div className="flex flex-col gap-3">
        {attendance.candidateDate.map((date) => (
          <div className="flex flex-row gap-2 items-center" key={date}>
            <div>{date}</div>
            <Controller
              name={`params.${date}`}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <SegmentedControl {...field} variant="basic" value={field.value || ''} onChange={field.onChange}>
                  <SegmentedControlButton value="ok">○</SegmentedControlButton>
                  <SegmentedControlButton value="pn">△</SegmentedControlButton>
                  <SegmentedControlButton value="ng">×</SegmentedControlButton>
                </SegmentedControl>
              )}
            />
          </div>
        ))}
      </div>
      <HStack justifyContent="space-around">
        <Button variant="outline" colorScheme="gray" onClick={routingDetail}>
          キャンセル
        </Button>
        <Button onClick={onClickRegisterButton} background="black" textColor="white" disabled={!isValid}>
          決定
        </Button>
      </HStack>
    </div>
  );
};

export default RegisterContainer;
