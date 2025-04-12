'use client';

import Title from '@/components/top/title';
import StartButton from '@/components/top/startButton';
import { useDisclosure } from '@yamada-ui/react';
import { Button } from '@yamada-ui/react';
import AttendanceEditDialog from './attendance/[uuid]/[participant]/edit/AttendanceEditDialog';

export default function Home() {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='text-center'>
        <Title />
        <StartButton />
      </div>
      <Button onClick={onOpen} background='black' textColor='white'>
        スケジュールを編集
      </Button>

      {/* # TODO: onSaveでAPIを叩く */}
      <AttendanceEditDialog isOpen={open} onClose={onClose} onSave={onClose} />
    </div>
  );
}
