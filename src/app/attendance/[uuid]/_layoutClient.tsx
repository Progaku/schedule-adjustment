'use client';

import { attendanceAtom, initialAttendance } from '@/store';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [_attendance, setAttendance] = useAtom(attendanceAtom);

  useEffect(() => {
    return () => {
      setAttendance({ ...initialAttendance });
    };
  }, []);

  return children;
}
