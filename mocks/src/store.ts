import attendance from './defaults/attendance.json';

interface State {
  [k: string]: {
    title: string;
    description: string;
    schedules: {
      id: string;
      name: string;
      params: {
        date: string;
        status: string;
      }[];
    }[];
  };
}

export const store: State = structuredClone(attendance);
