import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import { ConstantsProvider } from '@/components/ConstantsProvider';
import './globals.css';

const inter = Inter({
 subsets: ['latin'],
 variable: '--font-inter',
 display: 'swap',
});

export const metadata: Metadata = {
 title: 'Nurse Boundaries Builder | Professional Resilience Platform',
 description: 'Empowering nurses to reclaim their sanctuary through strategic boundary building.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
 return (
 <html lang="en" className={`${inter.variable}`}>
 <body suppressHydrationWarning className="font-sans antialiased text-slate-900 bg-slate-50">
 <ConstantsProvider>
 {children}
 </ConstantsProvider>
 </body>
 </html>
 );
}

