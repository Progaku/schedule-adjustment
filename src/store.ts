import { Attendance } from '@/interfaces/Attendance';
import { atom } from 'jotai';

export const initialAttendance = {
  title: '',
  description: '',
  candidateDate: [],
  schedules: [],
};

export const attendanceAtom = atom<Attendance>({
  ...initialAttendance,
});

export const participantAtom = atom<string | null>(null);

export const getParticipantAtom = atom((get) => {
  const participantUuid = get(participantAtom);
  if (!participantUuid) {
    return null;
  }
  let participant: Attendance['schedules'][number] | null = null;
  get(attendanceAtom).schedules.forEach((item) => {
    if (item.id === participantUuid) {
      participant = item;
    }
  });
  return participant;
});
