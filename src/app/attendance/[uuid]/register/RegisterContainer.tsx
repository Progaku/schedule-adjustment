'use client';

import { attendanceAtom } from '@/store';
import { SegmentedControl, SegmentedControlButton } from '@yamada-ui/react';
import { useAtom } from 'jotai/index';
import { redirect } from 'next/navigation';

const RegisterContainer = ({ uuid }: { uuid: string }) => {
  const [attendance, _setAttendance] = useAtom(attendanceAtom);
  if (!attendance || attendance.candidateDate.length === 0) {
    redirect(`/attendance/${uuid}`);
    return;
  }
  return (
    <>
      <div className="flex flex-col gap-3">
        {attendance.candidateDate.map((date) => (
          <div className="flex flex-row gap-2" key={date}>
            <div>{date}</div>
            <SegmentedControl variant="basic">
              <SegmentedControlButton value="ok">○</SegmentedControlButton>
              <SegmentedControlButton value="pn">△</SegmentedControlButton>
              <SegmentedControlButton value="ng">×</SegmentedControlButton>
            </SegmentedControl>
          </div>
        ))}
      </div>
    </>
  );
};

export default RegisterContainer;
