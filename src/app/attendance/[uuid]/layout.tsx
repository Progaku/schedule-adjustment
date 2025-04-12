import LayoutClient from '@/app/attendance/[uuid]/_layoutClient';
import { Provider } from 'jotai';
import Link from 'next/link';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <LayoutClient>
        <div className="p-[16px]">
          <Link href="/">Layout Header</Link>
          {children}
        </div>
      </LayoutClient>
    </Provider>
  );
}
