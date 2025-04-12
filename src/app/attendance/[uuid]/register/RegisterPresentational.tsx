import { Attendance } from '@/interfaces/Attendance';

type RegisterPresentationalProps = {
  attendance: Attendance;
};

const RegisterPresentational = ({ attendance }: RegisterPresentationalProps) => {
  return attendance.candidateDate.map((date) => <div key={date}>{date}</div>);
};

export default RegisterPresentational;
