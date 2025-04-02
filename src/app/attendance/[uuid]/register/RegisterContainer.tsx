import { fetchCandidateDates } from '@/lib/fetcher';
import { redirect } from 'next/navigation';
import RegisterPresentational from './RegisterPresentational';

type RegisterContainerProps = {
  params: Promise<{ uuid: string }>;
};

const RegisterContainer = async ({ params }: RegisterContainerProps) => {
  const uuid = (await params).uuid;
  try {
    const attendance = await fetchCandidateDates(uuid);
    return <RegisterPresentational attendance={attendance} />;
  } catch {
    redirect('/');
  }
};

export default RegisterContainer;
