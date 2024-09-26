import React from 'react';
import { useTranslations } from 'next-intl';

export default function Footer() {

  const t = useTranslations('Footer');
  return (
    <footer className='border-t w-full h-12 flex flex-col justify-center items-center text-base'>
        <p className="text-sm md:text-base text-center">{t("text")} <a target="_blank" className="underline" href="https://vandilson-portfolio.vercel.app/">Vandilson Brito</a></p>
    </footer>
  )
}
