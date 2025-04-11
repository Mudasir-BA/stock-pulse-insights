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
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getShopData, getShopPerformance } from '@/services/mockData';
import { CircleCheck, CircleX, Target, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const TargetsAchievement: React.FC = () => {
  const shopData = getShopData();
  const { topShops, bottomShops } = getShopPerformance();
  
  const targetData = shopData.map(shop => ({
    name: shop.name,
    target: shop.targetSales,
    actual: shop.actualSales,
    achievement: Math.round((shop.actualSales / shop.targetSales) * 100)
  }));

  return (
    <section id="targets-achievement" className="pt-8 pb-16">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Sales Target Achievement</CardTitle>
              <CardDescription>Performance against set targets</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-success/10 text-success border-success">
                <Target className="h-3 w-3 mr-1" />
                {Math.round((shopData.reduce((sum, shop) => sum + shop.actualSales, 0) / 
                  shopData.reduce((sum, shop) => sum + shop.targetSales, 0)) * 100)}% Overall Achievement
              </Badge>
            </div>
          </CardHeader>
        </Card>
        
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Target vs Actual</CardTitle>
            <CardDescription>Shop-wise sales performance against targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={targetData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, '']} />
                  <Legend />
                  <Bar dataKey="target" name="Target Sales" fill="#94A3B8" />
                  <Bar dataKey="actual" name="Actual Sales" fill="#3B82F6">
                    {targetData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.actual >= entry.target ? '#10B981' : '#F97316'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex items-center">
              <Trophy className="h-5 w-5 text-success mr-2" />
              <CardTitle>Top 5 Shops</CardTitle>
            </div>
            <CardDescription>By target achievement percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              {topShops.map((shop) => {
                const achievementPercentage = Math.round((shop.actualSales / shop.targetSales) * 100);
                return (
                <div key={shop.id} className="mb-4">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>{shop.name}</span>
                    <span className="font-medium">
                      {achievementPercentage}%
                      {achievementPercentage >= 100 && (
                        <CircleCheck className="inline h-4 w-4 text-success ml-1" />
                      )}
                    </span>
                  </div>
                  <Progress 
                    value={achievementPercentage > 100 ? 100 : achievementPercentage} 
                    className={`h-2 ${achievementPercentage >= 100 ? "bg-success" : "bg-info"}`}
                  />
                </div>
              )})}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex items-center">
              <CircleX className="h-5 w-5 text-danger mr-2" />
              <CardTitle>Bottom 5 Shops</CardTitle>
            </div>
            <CardDescription>Need improvement areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              {bottomShops.map((shop) => {
                const achievementPercentage = Math.round((shop.actualSales / shop.targetSales) * 100);
                return (
                <div key={shop.id} className="mb-4">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>{shop.name}</span>
                    <span className="font-medium">
                      {achievementPercentage}%
                      {achievementPercentage < 90 && (
                        <CircleX className="inline h-4 w-4 text-danger ml-1" />
                      )}
                    </span>
                  </div>
                  <Progress 
                    value={achievementPercentage} 
                    className={`h-2 ${
                      achievementPercentage < 80 ? "bg-danger" : 
                      achievementPercentage < 90 ? "bg-warning" : "bg-info"
                    }`}
                  />
                </div>
              )})}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-full md:col-span-1">
          <CardHeader>
            <CardTitle>Achievement Heat Map</CardTitle>
            <CardDescription>Region-based achievement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Region</TableHead>
                    <TableHead>Shops</TableHead>
                    <TableHead>Achievement</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from(new Set(shopData.map(shop => shop.region))).map(region => {
                    const regionShops = shopData.filter(shop => shop.region === region);
                    const regionAchievement = Math.round(
                      (regionShops.reduce((sum, shop) => sum + shop.actualSales, 0) / 
                      regionShops.reduce((sum, shop) => sum + shop.targetSales, 0)) * 100
                    );
                    
                    let bgColor;
                    if (regionAchievement >= 100) bgColor = "bg-success/20";
                    else if (regionAchievement >= 90) bgColor = "bg-info/20";
                    else if (regionAchievement >= 80) bgColor = "bg-warning/20";
                    else bgColor = "bg-danger/20";
                    
                    return (
                      <TableRow key={region} className={bgColor}>
                        <TableCell className="font-medium">{region}</TableCell>
                        <TableCell>{regionShops.length}</TableCell>
                        <TableCell className="font-bold">{regionAchievement}%</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TargetsAchievement;
