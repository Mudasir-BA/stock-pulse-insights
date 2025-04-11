
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from './DashboardHeader';
import FiltersBar from '../filters/FiltersBar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 animate-fade-in">
      <DashboardHeader />
      <div className="flex-1 container py-6 space-y-4 px-4 md:px-6">
        <FiltersBar />
        <div>
          {children}
        </div>
      </div>
      <footer className="py-6 border-t bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} Stock Pulse Insights. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
