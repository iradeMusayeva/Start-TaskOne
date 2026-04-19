import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      <h1>Xoş gəldiniz</h1>
      <Link href="/login">Daxil ol</Link>
    </div>
  )
}