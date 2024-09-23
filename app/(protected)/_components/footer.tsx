import React from 'react';
import Link from 'next/link';
import { Linkedin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t z-20 w-full">
      <div className="mx-4 md:mx-8 flex h-14 items-center justify-between">
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