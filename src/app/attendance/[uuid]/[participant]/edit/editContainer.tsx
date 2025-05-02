'use client';

import { getParticipantAtom } from '@/store';
import { useAtom } from 'jotai';
import { redirect } from 'next/navigation';

const EditContainer = ({ uuid: _uuid }: { uuid: string }) => {
  const [getParticipant, _] = useAtom(getParticipantAtom);
  if (!getParticipant || getParticipant.params.length === 0) {
    redirect('/');
    return;
  }
  return <div className="flex flex-col gap-3">{getParticipant.name}</div>;
};

export default EditContainer;
