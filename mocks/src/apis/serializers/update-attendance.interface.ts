import typia, { tags } from 'typia';

export interface UpdateAttendanceRequest {
  title: string & tags.MinLength<1> & tags.MaxLength<128>;
  description: string & tags.MaxLength<1000>;
}

export const UpdateAttendanceRequestValidate = typia.createValidate<UpdateAttendanceRequest>();
