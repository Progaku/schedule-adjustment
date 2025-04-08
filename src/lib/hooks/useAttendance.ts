import { Attendance } from '@/interfaces/Attendance';
import { API_URL } from '../const';
import useSWR from 'swr';

const fetcher = async (url: string): Promise<Attendance> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP status: ${res.status}`);
  }
  const data = await res.json();
  return data;
};

export const useAttendance = (uuid: string) => {
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
