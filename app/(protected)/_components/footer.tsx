import React from 'react';
import Link from 'next/link';
import { Linkedin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t z-20 w-full">
        <div className="max-w-[1440px] mx-auto flex h-14 items-center justify-between px-4 sm:px-6 md:px-8">
            <Link 
            href="#"
            >
            <div className="bg-blue-600 p-1 rounded-sm">
                <Linkedin className="w-4 h-4" />
            </div>
            </Link>
            <p className="text-xs md:text-sm text-muted-foreground">
            © {currentYear} Dataguru
            </p>
        </div>
    </div>
  );
};