'use client';

import { useUpdateParticipant } from '@/hooks/api';
import { RegisterParticipantForm, RegisterParticipantParamsInterface } from '@/interfaces/Attendance';
import { attendanceAtom, getParticipantAtom } from '@/store';
import { Button, FormControl, HStack, Input, SegmentedControl, SegmentedControlButton } from '@yamada-ui/react';
import { useAtom } from 'jotai';
import { redirect } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

const EditContainer = ({ uuid, participant }: { uuid: string; participant: string }) => {
  const [attendance, _setAttendance] = useAtom(attendanceAtom);
  const [getParticipant, _] = useAtom(getParticipantAtom);
  const {
    getValues,
    setValue,
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
    redirect(`/attendance/${uuid}`);
  };
  const onClickEditButton = async () => {
    const inputValues = getValues();
    const params = Object.entries(inputValues.params).map(([key, value]) => ({
      date: key,
      status: value,
    }));
    params.sort((a, b) => a.date.localeCompare(b.date));
    await useUpdateParticipant(uuid, participant, {
      name: inputValues.name,
      params,
    });
    routingDetail();
  };
  if (!getParticipant || getParticipant.params.length === 0) {
    redirect('/');
    return;
  }

  setValue('name', getParticipant.name);
  setValue(
    'params',
    getParticipant.params.reduce((acc, cur) => {
      acc[cur.date] = cur.status;
      return acc;
    }, {} as RegisterParticipantParamsInterface),
  );

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
        <Button onClick={onClickEditButton} background="black" textColor="white" disabled={!isValid}>
          決定
        </Button>
      </HStack>
    </div>
  );
};

export default EditContainer;
