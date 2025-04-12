'use client';

import { attendanceAtom } from '@/store';
import { useAtom } from 'jotai/index';
import { redirect } from 'next/navigation';
import RegisterPresentational from './RegisterPresentational';

const RegisterContainer = ({ uuid }: { uuid: string }) => {
  const [attendance, _setAttendance] = useAtom(attendanceAtom);
  if (!attendance || attendance.candidateDate.length === 0) {
    redirect(`/attendance/${uuid}`);
    return;
  }
  return <RegisterPresentational attendance={attendance} />;
};

export default RegisterContainer;
