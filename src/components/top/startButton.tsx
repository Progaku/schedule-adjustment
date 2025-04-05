import Link from 'next/link';

export default function StartButton() {
  return (
    <Link href="/register">
      <button className="w-[12.5em] bg-black text-white font-bold py-[5%] rounded">日程調整を始める</button>
    </Link>
  );
}
