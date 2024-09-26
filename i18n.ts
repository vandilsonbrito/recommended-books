import {getRequestConfig} from 'next-intl/server';
import { languages } from './constants/languages';
import { notFound } from 'next/navigation';

const locales = languages;
 
export default getRequestConfig(async ({ locale }) => {

  if (!locales.includes(locale as string)) notFound();
 
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});