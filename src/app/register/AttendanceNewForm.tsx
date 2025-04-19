'use client';
import { Button, Container, HStack, VStack } from '@yamada-ui/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import TitleField from './TitleField';
import ContentField from './ContentField';
import CandidateDatesField from './CandidateDatesField';
import { RegisterFormData } from '@/interfaces/RegisterFormData';

const AttendanceNewForm = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<RegisterFormData>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      content: '',
      candidate_dates: [],
    },
  });

  //TODO 新規登録用の server actionの作成
  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <Container maxW="container.md" mx="auto" p={32} h="100svh" display="flex" flexDirection="column">
      <VStack as="form" w="full" flex="1" g={12} justifyContent="space-between" onSubmit={handleSubmit(onSubmit)}>
        <VStack g={12}>
          <TitleField control={control} />
          <ContentField control={control} />
          <CandidateDatesField control={control} />
        </VStack>

        <HStack justifyContent="space-around">
          <Button variant="outline" colorScheme="gray" onClick={() => router.push('/')}>
            キャンセル
          </Button>
          <Button background="black" textColor="white" disabled={!isValid}>
            決定
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default AttendanceNewForm;
