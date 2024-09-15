import React, { useState, useEffect, useRef } from 'react';
import { Bird, Globe, Rabbit, Search, Turtle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';

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

const CompanySearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    useEffect(() => {
        if (searchTerm.length > 0) {
        const filteredResults = mockData.data.result.filter(company =>
            company.company_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResults(filteredResults);
        setIsOpen(true);
        } else {
        setResults([]);
        setIsOpen(false);
        }
    }, [searchTerm]);

    const getInitials = (countryName) => {
        return countryName.split(' ').map(word => word[0]).join('').toUpperCase();
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[450px] justify-between"
        >
          {value
            ? mockData.data.result.find((company) => company.company_name === value)?.company_name
            : "Select a company..."}
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[450px] p-0">
        <Command>
          <CommandInput placeholder="Search company..." />
          <CommandEmpty>No company found.</CommandEmpty>
          <CommandGroup>
            {mockData.data.result.map((company) => (
              <CommandItem
                key={company.ticker}
                value={company.company_name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <div className="flex items-start gap-3 text-muted-foreground">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                    {getInitials(company.country_name)}
                  </div>
                  <div className="grid gap-0.5">
                    <p>
                      <span className="font-medium text-foreground">
                        {company.company_name}
                      </span>
                    </p>
                    <p className="text-xs" data-description>
                      {company.ticker}
                    </p>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>

    )
    {/* 
                <div className="flex w-[450px] items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">

            <Select>
                <SelectTrigger
                id="model"
                className="items-start [&_[data-description]]:hidden"
                >
                    <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                    {results.map((company, index) => (
                        <SelectItem value="genesis">
                            <div className="flex items-start gap-3 text-muted-foreground">
                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                                    {getInitials(company.country_name)}
                                </div>
                                <div className="grid gap-0.5">
                                    <p>
                                        <span className="font-medium text-foreground">
                                            {company.company_name}
                                        </span>
                                    </p>
                                    <p className="text-xs" data-description>
                                        {company.ticker}
                                    </p>
                                </div>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>*/}
}

export default CompanySearch






