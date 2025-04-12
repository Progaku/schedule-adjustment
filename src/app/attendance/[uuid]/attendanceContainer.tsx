'use client';
import AttendanceEditDialog from '@/app/attendance/[uuid]/AttendanceEditDialog';
import { useAttendance } from '@/hooks/useAttendance';
import { attendanceAtom } from '@/store';
import { Button, Container, Heading, Text, useDisclosure } from '@yamada-ui/react';
import { useAtom } from 'jotai/index';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AttendanceContainer({
  uuid,
}: {
  uuid: string;
}) {
  const router = useRouter();
  const [_, setAttendance] = useAtom(attendanceAtom);
  const { attendance, error, isLoading } = useAttendance(uuid);
  const { open, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (error || !attendance) {
      console.error(`データ取得に失敗： ${error?.message}` || 'No data returned.');
      router.push('/');
      return;
    }

    setAttendance(attendance);
  }, [uuid, isLoading]);

  return (
    <>
      <div>
        <div className="flex flex-row justify-between items-center">
          <Container>
            <Heading>{attendance?.title ?? ''}</Heading>
            <Text>{attendance?.description ?? ''}</Text>
          </Container>
          <Button onClick={onOpen} background="black" textColor="white">
            スケジュールを編集
          </Button>
        </div>
        <Button onClick={() => router.push(`/attendance/${uuid}/register`)}>登録</Button>
      </div>
      <AttendanceEditDialog
        isOpen={open}
        onClose={onClose}
        onSave={onClose}
        title={attendance?.title ?? ''}
        description={attendance?.description ?? ''}
      />
    </>
  );
}
