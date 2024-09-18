'use client'
import Image from 'next/image';
import Logo from '../../public/logo.png';
import UserNav from './UserNav';

export default function Header() {
    
    return (
      <header className="w-full h-[6rem] bg-black px-5 md:px-14 flex items-center justify-between" id='/top'>
          <Image 
              src={Logo} 
              alt="Logo"
              className='w-16 md:w-20'
          />
          <h1 className='hidden md:block text-lg font-medium text-white'>The best recommended books for you</h1>
          <nav className='text-white'>
              <UserNav/>
          </nav>

      </header>
    )
}
