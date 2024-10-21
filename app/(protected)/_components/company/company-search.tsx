"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import AvatarWithStatus, { ValidStatus } from '@/app/(protected)/_components/company/avatar-with-status';

interface Company {
  company_name: string;
  ticker: string;
  country_name: string;
  status: ValidStatus;
  logo?: string;
}

const mockData = {
  "status": "success",
  "data": {
    "result": [
      {
        "company_name": "Solar Applied Materials Technology Corp",
        "ticker": "1785.TWO",
        "country_name": "TAIWAN",
        "status": "off" as ValidStatus,
        "logo": "https://app.dataguru.world/flags/tw.svg",
      },
      {
        "company_name": "Apple Inc",
        "ticker": "AAPL",
        "country_name": "SOUTH KOREA",
        "status": "live" as ValidStatus,
        "logo": "https://app.dataguru.world/flags/us.svg",
      },
      {
        "company_name": "Golden Solar New Energy Technology Holdings Ltd",
        "ticker": "1121.HK",
        "country_name": "CHINA",
        "status": "pending" as ValidStatus,
        "logo": "https://app.dataguru.world/flags/cn.svg",
      },
      {
        "company_name": "Nihon M&A Center Holdings Inc",
        "ticker": "2127 JP Equity",
        "country_name": "JAPAN",
        "status": "off" as ValidStatus
      },
      {
        "company_name": "A Holdings Corp",
        "ticker": "3938 JP Equity",
        "country_name": "JAPAN",
        "status": "pending" as ValidStatus,
        "logo": "/logos/a-holdings.png"
      }
    ] as Company[]
  }
};

const getInitials = (company: string) => {
  return company.charAt(0).toUpperCase();
};

interface CompanySearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompanySearch = ({ isOpen, onClose }: CompanySearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const companies = useMemo(() => mockData?.data?.result || [], []);

  const filteredCompanies = useMemo(() => {
    if (searchTerm === "") return companies;

    return companies.filter(company =>
      company.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [companies, searchTerm]);

  const handleCompanySelect = (company: Company) => {
    const ticker = company.ticker.split(' ')[0]; // only the number
    router.push(`/analyse/companies/${ticker}/snapshot`);
    setSearchTerm("");
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden">
        <Command className="rounded-lg">
          <CommandInput placeholder="Type a company name..." onValueChange={setSearchTerm} />
          <CommandList>
            <CommandEmpty>No companies found.</CommandEmpty>
            <CommandGroup heading="Companies">
              {filteredCompanies.map((company) => (
                <CommandItem
                  key={company.ticker}
                  value={company.company_name}
                  className="cursor-pointer"
                  onSelect={(value) => {
                    handleCompanySelect(company)
                  }}
                >
                  <div className="flex items-center">
                    <AvatarWithStatus
                      status={company.status}
                      logo={company.logo}
                      name={company.company_name}
                      initials={getInitials(company.company_name)}
                      size="sm"
                    />
                    <div className="ml-2">
                      <div className="font-medium">{company.company_name}</div>
                      <div className="text-sm text-gray-500">{company.ticker}</div>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default CompanySearch;