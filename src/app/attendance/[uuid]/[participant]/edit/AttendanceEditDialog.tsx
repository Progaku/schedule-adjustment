'use client';

import { useState } from 'react';
import {
  Modal,
  Button,
  Input,
  Textarea,
  Stack,
  FormControl,
  Label,
} from '@yamada-ui/react';

interface AttendanceEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function AttendanceEditDialog({
  isOpen,
  onClose,
  onSave,
}: AttendanceEditDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    onSave();
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      withCloseButton={false}
      size='xl'
      maxW='500px'
    >
      <Stack gap={8} p={4}>
        <FormControl>
          <Label fontWeight='bold'>タイトル</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl>
          <Label fontWeight='bold'>説明</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minH='120px'
          />
        </FormControl>
        <Stack direction='row' gap={4} justify='center'>
          <Button variant='ghost' onClick={onClose}>
            キャンセル
          </Button>
          <Button background='black' textColor='white' onClick={handleSave}>
            保存
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
}
