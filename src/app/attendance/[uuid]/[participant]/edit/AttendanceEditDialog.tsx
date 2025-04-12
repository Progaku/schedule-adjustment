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
  ErrorMessage,
} from '@yamada-ui/react';

const MAX_DESCRIPTION_LENGTH = 1000;
const MAX_TITLE_LENGTH = 128;

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

  const isTitleValid = title.length <= MAX_TITLE_LENGTH;
  const isDescriptionValid = description.length <= MAX_DESCRIPTION_LENGTH;
  const isTitleEmpty = title.trim().length === 0;

  const handleSave = () => {
    if (!isDescriptionValid || !isTitleValid || isTitleEmpty) return;
    onSave();
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      withCloseButton={false}
      size='xl'
      maxW='800px'
    >
      <Stack gap={8} p={4}>
        <FormControl
          invalid={!isTitleValid}
          helperMessage='128文字以内'
          required
        >
          <Label fontWeight='bold'>タイトル</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          <ErrorMessage>
            {title.length}/{MAX_TITLE_LENGTH}文字
            {!isTitleValid && ' (制限を超えています)'}
          </ErrorMessage>
        </FormControl>
        <FormControl invalid={!isDescriptionValid} helperMessage='1000文字以内'>
          <Label fontWeight='bold'>説明</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minH='400px'
          />
          <ErrorMessage>
            {description.length}/{MAX_DESCRIPTION_LENGTH}文字
            {!isDescriptionValid && ' (制限を超えています)'}
          </ErrorMessage>
        </FormControl>
        <Stack direction='row' gap={4} justify='center'>
          <Button variant='ghost' onClick={onClose}>
            キャンセル
          </Button>
          <Button
            background='black'
            textColor='white'
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
