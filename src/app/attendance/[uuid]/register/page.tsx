import RegisterContainer from './RegisterContainer';

export default function RegisterAttendance({ params }: { params: Promise<{ uuid: string }> }) {
  return <RegisterContainer params={params} />;
}
