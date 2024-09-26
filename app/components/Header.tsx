'use client'
import Image from 'next/image';
import Logo from '../../public/logo.png';
import UserNav from './UserNav';
import { Link } from "../../navigation";
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from "../../navigation";
import { ChangeEvent, useEffect, useState } from 'react';

export default function Header() {
    
    const t = useTranslations('Header');
    const router = useRouter();
    const pathname = usePathname();
    const [languageOption, setLanguageOption] = useState<string>('');

    const handleLanguageChange = (e:ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        setLanguageOption(value);
        router.push(pathname, { locale: value });
    }

    useEffect(() => {
        function getCookie(name:string) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts?.pop()?.split(';')?.shift();
        }
        setLanguageOption(getCookie('NEXT_LOCALE') || 'pt');
    }, [setLanguageOption])

    return (
      <header className="w-full h-[6rem] bg-black px-5 md:px-8 lg:px-14 flex items-center justify-between" id='/top'>
            <Link href="/books">
                <Image 
                    src={Logo} 
                    alt="Logo"
                    className='w-16 md:w-20'
                />
            </Link>
            <h1 className='hidden lg:block text-lg font-medium text-white'>{t("title")}</h1>
            
            <div className="flex items-center justify-center gap-6 ">
                <form className='text-lg font-semibold '>
                    {/* <label htmlFor="language" className='text-base pr-2'>{t("Banner.language")}</label> */}
                    <select id='language' className="cursor-pointer" onChange={(e) => handleLanguageChange(e)} value={languageOption}>
                        <option value="pt">PT</option>
                        <option value="en">EN</option>
                    </select>
                </form>
                <nav className='text-white'>
                    <UserNav/>
                </nav>
            </div>
      </header>
    )
}
