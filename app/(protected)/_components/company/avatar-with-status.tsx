import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type ValidStatus = 'live' | 'off' | 'pending';

interface AvatarWithStatusProps {
  status: ValidStatus;
  logo?: string;
  name: string;
  initials: string;
  size?: 'sm' | 'md' | 'lg';
}

export const statusColors: Record<ValidStatus, string> = {
    live: 'bg-green-500',
    off: 'bg-red-500',
    pending: 'bg-yellow-500'
};

export const textColors: Record<ValidStatus, string> = {
    live: 'text-green-500',
    off: 'text-red-500',
    pending: 'text-yellow-500'
};

const AvatarWithStatus = ({ status, logo, name, initials, size = 'md' }: AvatarWithStatusProps) => {
  const sizeClasses = {
    sm: 'h-7 w-7',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };
  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-2xl'
  };

  return (
    <div className={`rounded-full p-0.5 ${statusColors[status]}`}>
      <Avatar className={`${sizeClasses[size]} border-1 ${statusColors[status]} bg-white`}>
        {logo ? (
          <AvatarImage 
            src={logo} 
            alt={name} 
            className="brightness-50"
          />
        ) : null}
        <div className={`absolute inset-0 flex items-center justify-center font-medium ${textSizeClasses[size]} ${textColors[status]}`}>
          {initials}
        </div>
        <AvatarFallback className={textColors[status]}>{initials}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default AvatarWithStatus;