'use client';

import StartButton from '@/components/top/startButton';
import Title from '@/components/top/title';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <Title />
        <StartButton />
      </div>
    </div>
  );
}
