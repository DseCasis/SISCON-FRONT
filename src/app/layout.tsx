import { Inter } from 'next/font/google'
import './globals.css'
import {ReactNode} from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'SISCON',
    description: 'Pagina en desarrollo',
}

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
        <body className={inter.className}>{children}</body>
        </html>
    );
}