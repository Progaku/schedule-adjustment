import { use } from 'react';
import RegisterContainer from './RegisterContainer';

export default function RegisterAttendance({ params }: { params: Promise<{ uuid: string }> }) {
  const uuid = use(params).uuid;
  return <RegisterContainer uuid={uuid} />;
}
