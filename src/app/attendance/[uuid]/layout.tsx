import LayoutClient from '@/app/attendance/[uuid]/_layoutClient';
import Header from '@/components/top/header';
import { Provider } from 'jotai';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <LayoutClient>
        <div className="p-[16px]">
          <Header />
          {children}
        </div>
      </LayoutClient>
    </Provider>
  );
}
