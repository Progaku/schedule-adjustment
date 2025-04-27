import { Attendance } from '@/interfaces/Attendance';
import { convertStatusToSymbol } from '@/utils/utils';
import { Link, NativeTable, TableContainer, Tbody, Td, Th, Thead, Tr } from '@yamada-ui/react';

type AttendanceTableProps = {
  uuid: string;
  attendance: Attendance;
};

const AttendanceTable = ({ uuid, attendance }: AttendanceTableProps) => {
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
                <Link href={`/attendance/${uuid}/${item.id}/edit`}>{item.name}</Link>
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
