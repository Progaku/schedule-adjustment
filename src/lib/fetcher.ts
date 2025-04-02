'use server';
import { Attendance } from '@/interfaces/Attendance';
import { API_URL } from './const';

class FetchApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'FetchApiError';
  }
}

export async function fetchCandidateDates(uuid: string): Promise<Attendance> {
  try {
    const url = `${API_URL.BASE_URL}/${uuid}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      switch (res.status) {
        case 404:
          throw new FetchApiError(404, `予定表が見つかりません。UUID:${uuid}`);
        default:
          throw new FetchApiError(res.status, `システムエラーが発生しました。内容：${res.statusText}`);
      }
    }
    const data: Attendance = await res.json();
    if (!data) {
      throw new FetchApiError(404, `予定表が見つかりません。uuid：${uuid}`);
    }
    return data;
  } catch (error) {
    if (error instanceof FetchApiError) {
      console.error(`FetchApiError: ${error.status} - ${error.message}`);
    }
    if (error instanceof Error) {
      console.error(`予期せぬエラーが発生しました。：${error.message}`);
    }
    throw error;
  }
}
