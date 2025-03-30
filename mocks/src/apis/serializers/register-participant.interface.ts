import typia, { tags } from 'typia';

type DateParams = {
  date: string & tags.Format<'date'>;
  status: 'ok' | 'pn' | 'ng';
};

export interface RegisterParticipantRequest {
  name: string & tags.MinLength<1> & tags.MaxLength<256>;
  params: DateParams[];
}

export const RegisterParticipantRequestValidate = typia.createValidate<RegisterParticipantRequest>();
