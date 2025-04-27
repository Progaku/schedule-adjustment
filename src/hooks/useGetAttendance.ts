import { API_URL } from '@/const';
import { Attendance, RegisterAttendanceForm } from '@/interfaces/Attendance';
import { RegisterAttendanceRequest } from '@/interfaces/RegisterAttendanceForm';
import useSWR from 'swr';

const fetcher = async (url: string): Promise<Attendance> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP status: ${res.status}`);
  }
  return res.json();
};

const postRequest = async <T, V>(url: string, data: T): Promise<V> => {
  const res = await fetch(url, {
    method: 'POST',
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
