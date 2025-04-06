'use client';

import { useState } from 'react';
import { Button } from '@yamada-ui/react';
import AttendanceEditDialog from './attendance/[uuid]/[participant]/edit/AttendanceEditDialog';

export default function Home() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleSave = () => {
    setIsEditDialogOpen(false);
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <Button onClick={handleEdit} background='black' textColor='white'>
        スケジュールを編集
      </Button>

      <AttendanceEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
