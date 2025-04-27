export interface Attendance {
  title: string;
  description: string;
  candidateDate: string[];
  schedules: {
    id: string;
    name: string;
    params: {
      date: string;
      status: string;
    }[];
  }[];
}

export type RegisterAttendanceForm = {
  title: string;
  description: string;
  candidateDate: Date[];
};
