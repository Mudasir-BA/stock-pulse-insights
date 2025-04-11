
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { 
  getDailySalesData, 
  getShopData, 
  getTopCategorySales,
  getHourlySalesData
} from '@/services/mockData';
import { CalendarClock, BarChart3, TrendingUp } from 'lucide-react';

const SalesTrends: React.FC = () => {
  const dailySales = getDailySalesData();
  const shopData = getShopData();
  const categorySales = getTopCategorySales();
  const hourlySales = getHourlySalesData();
  
  // Format sales data for charts
  const formattedDailySales = dailySales.map(item => ({
    ...item,
    date: item.date.substring(5) // Show only MM-DD
  }));

  const formattedShopData = shopData.map(shop => ({
    name: shop.name,
    value: shop.actualSales
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <section id="sales-trends" className="pt-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Sales Trends</CardTitle>
              <CardDescription>Daily and weekly sales performance</CardDescription>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success">
              <TrendingUp className="h-3 w-3 mr-1" />
              {Math.round((dailySales[dailySales.length - 1].value / dailySales[0].value - 1) * 100)}% Increase
            </Badge>
          </CardHeader>
        </Card>

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Overall Sales Trend</CardTitle>
            <CardDescription>Daily sales for the last 10 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={formattedDailySales}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    name="Sales ($)" 
                    stroke="#3B82F6" 
                    fillOpacity={1} 
                    fill="url(#colorSales)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center">
            <div>
              <CardTitle>Top Performing Shops</CardTitle>
              <CardDescription>By sales value</CardDescription>
            </div>
            <BarChart3 className="h-4 w-4 ml-auto text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={formattedShopData}
                  margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
                  <Bar dataKey="value" fill="#10B981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center">
            <div>
              <CardTitle>Top Categories</CardTitle>
              <CardDescription>Category-wise sales distribution</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categorySales}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="sales"
                    nameKey="category"
                    label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categorySales.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center">
            <div>
              <CardTitle>Hourly Sales Trend</CardTitle>
              <CardDescription>For planning daily operations</CardDescription>
            </div>
            <CalendarClock className="h-4 w-4 ml-auto text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={hourlySales}
                  margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" tickFormatter={(hour) => `${hour}:00`} />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Sales']} labelFormatter={(hour) => `${hour}:00`} />
                  <Bar dataKey="sales" fill="#F97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SalesTrends;
