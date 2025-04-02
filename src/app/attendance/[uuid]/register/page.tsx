import { Suspense } from 'react';
import RegisterContainer from './RegisterContainer';

export default function RegisterAttendance({ params }: { params: Promise<{ uuid: string }> }) {
  return (
    //TODO スケルトンUI
    <Suspense fallback="loading">
      <RegisterContainer params={params} />
    </Suspense>
  );
}
