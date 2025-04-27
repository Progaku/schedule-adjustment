'use client';
import { useRegisterAttendance } from '@/hooks/useGetAttendance';
import { RegisterAttendanceForm } from '@/interfaces/Attendance';
import { Button, Container, HStack, VStack } from '@yamada-ui/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import CandidateDatesField from './CandidateDatesField';
import ContentField from './ContentField';
import TitleField from './TitleField';

const AttendanceNewForm = () => {
  const router = useRouter();

  const {
    control,
    getValues,
    formState: { isValid },
  } = useForm<RegisterAttendanceForm>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      candidateDate: [],
    },
  });

  const onClickRegisterButton = async () => {
    const { uuid } = await useRegisterAttendance(getValues());
    router.push(`/attendance/${uuid}`);
  };

  return (
    <Container maxW="container.md" mx="auto" p={32} h="100svh" display="flex" flexDirection="column">
      <VStack as="form" w="full" flex="1" g={12} justifyContent="space-between">
        <VStack g={12}>
          <TitleField control={control} />
          <ContentField control={control} />
          <CandidateDatesField control={control} />
        </VStack>

        <HStack justifyContent="space-around">
          <Button variant="outline" colorScheme="gray" onClick={() => router.push('/')}>
            キャンセル
          </Button>
          <Button onClick={onClickRegisterButton} background="black" textColor="white" disabled={!isValid}>
            決定
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default AttendanceNewForm;
