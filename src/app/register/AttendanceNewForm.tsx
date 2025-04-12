'use client';

import { MultiDatePicker } from '@yamada-ui/calendar';
import { Button, Container, FormControl, HStack, Input, Text, Textarea, VStack } from '@yamada-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AttendanceNewForm = () => {
  const router = useRouter();

  const [isDateValid, setIsDateValid] = useState<boolean>(false);
  const [isTitleValid, setIsTitleValid] = useState<boolean>(false);

  const handleDateChange = (selectedDates: Date[]) => {
    const isValid = selectedDates.length >= 2;
    setIsDateValid(isValid);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = e.target.value.trim().length > 0;
    setIsTitleValid(isValid);
  };

  //TODO 新規登録用の server actionの作成

  return (
    <Container maxW="container.md" mx="auto" p={32} h="100svh" display="flex" flexDirection="column">
      <VStack as="form" w="full" flex="1" g={12} justifyContent="space-between">
        <VStack g={12}>
          <FormControl required label="タイトル" errorMessage="タイトルは必須です。" helperMessage="128文字以内">
            <Input placeholder="入力内容" name="title" maxLength={128} onChange={handleTitleChange} />
          </FormControl>

          <FormControl label="説明">
            <Textarea placeholder="説明を任意で入力" name="content" maxLength={1000} />
          </FormControl>

          <FormControl required label="候補日" errorMessage="候補日は必須です。">
            <Text fontSize="sm" color="gray.500" mb={2}>
              今日以降で2日以上
            </Text>
            <MultiDatePicker
              placeholder="YYYY/MM/DD"
              minDate={new Date()}
              locale="ja"
              onChange={handleDateChange}
              name="candidate_dates"
              today
            />
          </FormControl>
        </VStack>

        <HStack justifyContent="space-around">
          <Button variant="outline" colorScheme="gray" onClick={() => router.push('/')}>
            キャンセル
          </Button>
          <Button background="black" textColor="white" disabled={!isDateValid || !isTitleValid}>
            決定
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default AttendanceNewForm;
