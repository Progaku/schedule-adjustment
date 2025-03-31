import Link from "next/link";

export default function StartButton() {
  return (
    <button>
      <Link href="/register">日程調整を始める</Link>
    </button>
  );
}
