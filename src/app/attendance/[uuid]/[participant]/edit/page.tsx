import { use } from 'react';
import EditContainer from './editContainer';

export default function EditAttendance({ params }: { params: Promise<{ uuid: string; participant: string }> }) {
  const uuid = use(params).uuid;
  return (
    <div>
      <EditContainer uuid={uuid} />
    </div>
  );
}
