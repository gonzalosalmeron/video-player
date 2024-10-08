import Link from 'next/link'

import { Button } from '@/components/ui/button'

const navigation = [
  {
    link: '/',
    name: 'Home',
  },
  {
    link: '/',
    name: 'Series',
  },
  {
    link: '/',
    name: 'Movies',
  },
]

export default function Navbar() {
  return (
    <nav className='flex items-center justify-between bg-background py-2'>
      <div className='flex items-center gap-2'>
        <h1 className='mr-4 text-2xl font-semibold uppercase text-red-600'>
          nextflix
        </h1>

        <ul className='flex items-center gap-2'>
          {navigation.map(({ link, name }, i) => (
            <li key={i}>
              <Button variant={'ghost'} asChild>
                <Link href={link} className='flex items-center gap-1'>
                  {name}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
