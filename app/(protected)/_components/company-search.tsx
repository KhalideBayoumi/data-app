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

interface Company {
  company_name: string;
  ticker: string;
  country_name: string;
}

const mockData = {
  "status": "success",
  "data": {
    "result": [
      {
        "company_name": "A-Living Smart City Services Co Ltd",
        "ticker": "3319 HK Equity",
        "country_name": "CHINA"
      },
      {
        "company_name": "Sam-A Aluminum Co Ltd",
        "ticker": "006110 KS Equity",
        "country_name": "SOUTH KOREA"
      },
      {
        "company_name": "Samsung E&A Co Ltd",
        "ticker": "028050 KS Equity",
        "country_name": "SOUTH KOREA"
      },
      {
        "company_name": "Nihon M&A Center Holdings Inc",
        "ticker": "2127 JP Equity",
        "country_name": "JAPAN"
      },
      {
        "company_name": "A Holdings Corp",
        "ticker": "3938 JP Equity",
        "country_name": "JAPAN"
      }
    ]
  }
};

const getInitials = (countryName: string) => {
  return countryName.split(' ').map(word => word[0]).join('').toUpperCase();
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
    router.push(`/analyse/companies/${ticker}`);
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
                  onSelect={(value) => {
                    handleCompanySelect(company)
                  }}
                >
                  <div className="flex items-center">
                    <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-xs font-medium text-white">
                      {getInitials(company.country_name)}
                    </div>
                    <div>
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