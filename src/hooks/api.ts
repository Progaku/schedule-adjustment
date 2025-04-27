import { API_URL } from '@/const';
import { Attendance, RegisterAttendanceForm } from '@/interfaces/Attendance';
import { RegisterAttendanceRequest, UpdateAttendanceRequest } from '@/interfaces/api';
import useSWR from 'swr';

const fetcher = async (url: string): Promise<Attendance> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP status: ${res.status}`);
  }
  return res.json();
};

const PutRequestBase = async <T, V>(method: string, url: string, data: T): Promise<V> => {
  const res = await fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP status: ${res.status}`);
  }
  return res.json();
};

const postRequest = async <T, V>(url: string, data: T): Promise<V> => {
  return PutRequestBase<T, V>('POST', url, data);
};

const patchRequest = async <T, V>(url: string, data: T): Promise<V> => {
  return PutRequestBase<T, V>('PATCH', url, data);
};

export const useGetAttendance = (uuid: string) => {
  const url = `${API_URL.BASE_URL}/${uuid}`;

  const { data, error, isLoading } = useSWR<Attendance>(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    attendance: data,
    error,
    isLoading,
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
  return postRequest<RegisterAttendanceRequest, { uuid: string }>(url, requestBody);
};

export const useUpdateAttendance = async (uuid: string, body: UpdateAttendanceRequest): Promise<void> => {
  const url = `${API_URL.BASE_URL}/${uuid}`;
  return patchRequest<UpdateAttendanceRequest, void>(url, body);
};
