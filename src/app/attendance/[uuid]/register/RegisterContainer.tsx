'use client';
import { use } from 'react';
import { redirect } from 'next/navigation';
import RegisterPresentational from './RegisterPresentational';
import { useAttendance } from '@/lib/hooks/useAttendance';

type RegisterContainerProps = {
  params: Promise<{ uuid: string }>;
};

const RegisterContainer = ({ params }: RegisterContainerProps) => {
  const uuid = use(params).uuid;
  const { attendance, error, isLoading } = useAttendance(uuid);
  if (isLoading) return <div className="bg-green-500">loading</div>; //TODO ローディングコンポーネント
  if (error || !attendance) {
    console.error(`データ取得に失敗： ${error?.message}` || 'No data returned.');
    redirect('/');
  }
  return <RegisterPresentational attendance={attendance} />;
};

export default RegisterContainer;
