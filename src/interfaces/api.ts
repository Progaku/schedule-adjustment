export interface RegisterAttendanceRequest {
  title: string;
  description: string;
  candidateDate: string[];
}

export interface UpdateAttendanceRequest {
  title: string;
  description: string;
}

export interface RegisterParticipantRequest {
  name: string;
  params: {
    date: string;
    status: 'ok' | 'pn' | 'ng';
  }[];
}

export interface UpdateParticipantRequest {
  name: string;
  params: {
    date: string;
    status: 'ok' | 'pn' | 'ng';
  }[];
}
