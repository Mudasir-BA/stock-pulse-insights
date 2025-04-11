
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import StockOverview from '@/components/stocks/StockOverview';
import SalesTrends from '@/components/sales/SalesTrends';
import TargetsAchievement from '@/components/targets/TargetsAchievement';
import { FilterProvider } from '@/contexts/FilterContext';

const Index: React.FC = () => {
  return (
    <FilterProvider>
      <DashboardLayout>
        <div className="space-y-8">
          <StockOverview />
          <SalesTrends />
          <TargetsAchievement />
        </div>
      </DashboardLayout>
    </FilterProvider>
  );
};

export default Index;
