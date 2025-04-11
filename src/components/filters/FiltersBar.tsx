
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, FilterIcon } from 'lucide-react';
import { useFilterContext } from '@/contexts/FilterContext';

const FiltersBar: React.FC = () => {
  const { filters, updateFilters } = useFilterContext();
  const [date, setDate] = React.useState<Date>();

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date);
    if (date) {
      updateFilters({ startDate: date });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <FilterIcon className="h-4 w-4" />
        <span>Filters:</span>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <Select onValueChange={(value) => updateFilters({ shop: value })}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Shop" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Shops</SelectItem>
            <SelectItem value="downtown">Downtown</SelectItem>
            <SelectItem value="uptown">Uptown</SelectItem>
            <SelectItem value="west-end">West End</SelectItem>
            <SelectItem value="east-side">East Side</SelectItem>
            <SelectItem value="central">Central</SelectItem>
          </SelectContent>
        </Select>
        
        <Select onValueChange={(value) => updateFilters({ category: value })}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="home-goods">Home Goods</SelectItem>
            <SelectItem value="groceries">Groceries</SelectItem>
            <SelectItem value="toys">Toys</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline" onClick={() => updateFilters({ reset: true })}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default FiltersBar;
