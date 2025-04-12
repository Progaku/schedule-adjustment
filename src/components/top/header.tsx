'use client';
import { Heading } from '@yamada-ui/react';
import Link from 'next/link';

export default function Header() {
  return (
    <Link href="/">
      <Heading>日程調整アプリ</Heading>
    </Link>
  );
}
