'use client';
import AttendanceEditDialog from '@/app/attendance/[uuid]/AttendanceEditDialog';
import ConfirmDialog from '@/components/shared/confirmDialog';
import { useGetAttendance, useUpdateAttendance } from '@/hooks/api';
import { UpdateAttendanceRequest } from '@/interfaces/api';
import { attendanceAtom } from '@/store';
import { Button, Container, Heading, Text, useBoolean, useDisclosure } from '@yamada-ui/react';
import { useAtom } from 'jotai/index';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AttendanceTable from './AttendanceTable';

export default function AttendanceContainer({ uuid }: { uuid: string }) {
  const router = useRouter();
  const [_, setAttendance] = useAtom(attendanceAtom);
  const [flg, { on, off }] = useBoolean(false);
  const { attendance, error, isLoading, mutate } = useGetAttendance(uuid);
  const {
    open: openForEditAttendance,
    onOpen: onOpenForEditAttendance,
    onClose: onCloseForEditAttendance,
  } = useDisclosure();

  const {
    open: openForConfirmDialog,
    onOpen: onOpenForConfirmDialog,
    onClose: onCloseForConfirmDialog,
  } = useDisclosure();

  useEffect(() => {
    console.log(flg);
  }, [flg]);

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

  const onUpdate = async (data: UpdateAttendanceRequest) => {
    onCloseForEditAttendance();
    await useUpdateAttendance(uuid, data);
    await mutate();
  };

  return (
    <>
      <div>
        <div>
          <div className="flex flex-row justify-between items-center">
            <Container>
              <Heading>{attendance?.title ?? ''}</Heading>
              <Text>{attendance?.description ?? ''}</Text>
            </Container>
            <Button onClick={onOpenForEditAttendance} background="black" textColor="white">
              スケジュールを編集
            </Button>
          </div>
          {attendance && (
            <Container>
              <AttendanceTable uuid={uuid} attendance={attendance} />
            </Container>
          )}
        </div>
        <AttendanceEditDialog
          isOpen={openForEditAttendance}
          onClose={onCloseForEditAttendance}
          onSave={onUpdate}
          title={attendance?.title ?? ''}
          description={attendance?.description ?? ''}
        />
      </div>
      <div className="flex justify-between">
        <Button onClick={onOpenForConfirmDialog} variant="outline" colorScheme="gray">
          削除
        </Button>
        <Button onClick={() => router.push(`/attendance/${uuid}/register`)} background="black" textColor="white">
          登録
        </Button>
      </div>
      <ConfirmDialog
        isOpen={openForConfirmDialog}
        onClose={() => {
          off();
          onCloseForConfirmDialog();
        }}
        onSave={() => {
          on();
          onCloseForConfirmDialog();
        }}
      />
    </>
  );
}
