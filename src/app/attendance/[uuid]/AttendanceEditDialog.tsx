'use client';

import { UpdateAttendanceRequest } from '@/interfaces/api';
import { Button, ErrorMessage, FormControl, Input, Label, Modal, Stack, Textarea } from '@yamada-ui/react';
import { useEffect, useState } from 'react';

const MAX_DESCRIPTION_LENGTH = 1000;
const MAX_TITLE_LENGTH = 128;

interface AttendanceEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: UpdateAttendanceRequest) => void;
  title: string;
  description: string;
}

export default function AttendanceEditDialog({
  isOpen,
  onClose,
  onSave,
  title: _title,
  description: _description,
}: AttendanceEditDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setTitle(_title);
    setDescription(_description);
  }, [_title, _description, isOpen]);

  const isTitleValid = title.length <= MAX_TITLE_LENGTH;
  const isDescriptionValid = description.length <= MAX_DESCRIPTION_LENGTH;
  const isTitleEmpty = title.trim().length === 0;

  const handleSave = () => {
    if (!isDescriptionValid || !isTitleValid || isTitleEmpty) return;
    onSave({ title, description });
  };

  return (
    <Modal open={isOpen} onClose={onClose} withCloseButton={false} size="xl" maxW="800px">
      <Stack gap={8} p={4}>
        <FormControl invalid={!isTitleValid} helperMessage="128文字以内" required>
          <Label fontWeight="bold">タイトル</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          <ErrorMessage>
            {title.length}/{MAX_TITLE_LENGTH}文字
            {!isTitleValid && ' (制限を超えています)'}
          </ErrorMessage>
        </FormControl>
        <FormControl invalid={!isDescriptionValid} helperMessage="1000文字以内">
          <Label fontWeight="bold">説明</Label>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} minH="400px" />
          <ErrorMessage>
            {description.length}/{MAX_DESCRIPTION_LENGTH}文字
            {!isDescriptionValid && ' (制限を超えています)'}
          </ErrorMessage>
        </FormControl>
        <Stack direction="row" gap={4} justify="center">
          <Button variant="ghost" onClick={onClose}>
            キャンセル
          </Button>
          <Button
            background="black"
            textColor="white"
            onClick={handleSave}
            disabled={!isDescriptionValid || !isTitleValid || isTitleEmpty}
          >
            保存
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
}
