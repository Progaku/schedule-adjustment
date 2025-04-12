'use client';
import { useAttendance } from '@/lib/hooks/useAttendance';
import { redirect } from 'next/navigation';
import { use } from 'react';
import RegisterPresentational from './RegisterPresentational';

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
