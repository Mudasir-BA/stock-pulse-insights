
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, BoxIcon, LineChart, Target } from 'lucide-react';

const DashboardHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">StockPulse Insights</span>
          </div>
        </div>
        
        <Tabs defaultValue="stock" className="w-full">
          <div className="flex justify-center md:justify-start w-full">
            <TabsList>
              <TabsTrigger value="stock" className="flex items-center space-x-1" asChild>
                <a href="#stock-overview">
                  <BoxIcon className="h-4 w-4 mr-1" />
                  <span>Stock Overview</span>
                </a>
              </TabsTrigger>
              <TabsTrigger value="sales" className="flex items-center space-x-1" asChild>
                <a href="#sales-trends">
                  <LineChart className="h-4 w-4 mr-1" />
                  <span>Sales Trends</span>
                </a>
              </TabsTrigger>
              <TabsTrigger value="targets" className="flex items-center space-x-1" asChild>
                <a href="#targets-achievement">
                  <Target className="h-4 w-4 mr-1" />
                  <span>Targets</span>
                </a>
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>
    </header>
  );
};

export default DashboardHeader;
