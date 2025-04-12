import AttendanceContainer from '@/app/attendance/[uuid]/attendanceContainer';
import { use } from 'react';

export default function AttendanceDashboard({ params }: { params: Promise<{ uuid: string }> }) {
  const uuid = use(params).uuid;

  return <AttendanceContainer uuid={uuid} />;
}
