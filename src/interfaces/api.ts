export interface RegisterAttendanceRequest {
  title: string;
  description: string;
  candidateDate: string[];
}

export interface UpdateAttendanceRequest {
  title: string;
  description: string;
}
