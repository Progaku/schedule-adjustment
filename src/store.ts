import { Attendance } from '@/interfaces/Attendance';
import { atom } from 'jotai';

export const attendanceAtom = atom<Attendance>({
  title: '',
  description: '',
  candidateDate: [],
  schedules: [],
});
