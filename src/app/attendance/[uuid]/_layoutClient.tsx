'use client';

import { useEffect } from 'react';

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    return () => {
      console.log('unmount');
    };
  }, []);

  return children;
}
