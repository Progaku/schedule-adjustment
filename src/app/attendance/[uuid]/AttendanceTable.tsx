import { Attendance } from '@/interfaces/Attendance';
import { participantAtom } from '@/store';
import { convertStatusToSymbol } from '@/utils/utils';
import { Button, NativeTable, TableContainer, Tbody, Td, Th, Thead, Tr } from '@yamada-ui/react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';

type AttendanceTableProps = {
  uuid: string;
  attendance: Attendance;
};

const AttendanceTable = ({ uuid, attendance }: AttendanceTableProps) => {
  const router = useRouter();
  const [_participant, setParticipant] = useAtom(participantAtom);
  const onclickParticipantLink = (participant: string) => {
    setParticipant(participant);
    router.push(`/attendance/${uuid}/${participant}/edit`);
  };
  return (
    <TableContainer>
      <NativeTable>
        <Thead>
          <Tr>
            <Th> </Th>
            {attendance.candidateDate.map((date) => (
              <Th key={date} textAlign="center">
                {date}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {attendance.schedules.map((item) => (
            <Tr key={item.id}>
              <Td>
                <Button variant="ghost" colorScheme="link" onClick={() => onclickParticipantLink(item.id)}>
                  {item.name}
                </Button>
              </Td>
              {attendance.candidateDate.map((date) => {
                const resultParam = item.params.find((param) => param.date === date);
                return (
                  <Td key={date} textAlign="center">
                    {resultParam ? convertStatusToSymbol(resultParam.status) : '-'}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </NativeTable>
    </TableContainer>
  );
};

export default AttendanceTable;
