import typia, { tags } from 'typia';

export interface RegisterAttendanceRequest {
  title: string & tags.MinLength<1> & tags.MaxLength<128>;
  description: string & tags.MaxLength<1000>;
  candidateDate: Array<string & tags.Format<'date'>>;
}

export const RegisterAttendanceRequestValidate = typia.createValidate<RegisterAttendanceRequest>();
