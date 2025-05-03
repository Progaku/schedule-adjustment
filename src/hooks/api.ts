import { API_URL } from '@/const';
import { Attendance, RegisterAttendanceForm } from '@/interfaces/Attendance';
import {
  RegisterAttendanceRequest,
  RegisterParticipantRequest,
  UpdateAttendanceRequest,
  UpdateParticipantRequest,
} from '@/interfaces/api';
import useSWR from 'swr';

const fetcher = async (url: string): Promise<Attendance> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP status: ${res.status}`);
  }
  return res.json();
};

const patchRequest = async <T>(url: string, data: T): Promise<void> => {
  const res = await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP status: ${res.status}`);
  }
};

export const useGetAttendance = (uuid: string) => {
  const url = `${API_URL.BASE_URL}/${uuid}`;

  const { data, error, isLoading, mutate } = useSWR<Attendance>(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    attendance: data,
    error,
    isLoading,
    mutate,
  };
};

export const useRegisterAttendance = async (body: RegisterAttendanceForm) => {
  const url = API_URL.BASE_URL;
  const requestBody: RegisterAttendanceRequest = {
    ...body,
    candidateDate: body.candidateDate.map((item) =>
      item.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('/', '-'),
    ),
  };
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP status: ${res.status}`);
  }
  return res.json();
};

export const useUpdateAttendance = async (uuid: string, body: UpdateAttendanceRequest): Promise<void> => {
  const url = `${API_URL.BASE_URL}/${uuid}`;
  return patchRequest<UpdateAttendanceRequest>(url, body);
};

export const useRegisterParticipant = async (uuid: string, body: RegisterParticipantRequest): Promise<void> => {
  const url = `${API_URL.BASE_URL}/${uuid}`;
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP status: ${res.status}`);
  }
};

export const useUpdateParticipant = async (
  uuid: string,
  participant: string,
  body: UpdateParticipantRequest,
): Promise<void> => {
  const url = `${API_URL.BASE_URL}/${uuid}/${participant}`;
  const res = await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP status: ${res.status}`);
  }
};
