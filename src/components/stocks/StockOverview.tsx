import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StockItem, getLowStockItems, getZeroStockItems, getShopData } from '@/services/mockData';
import { AlertTriangle, CircleSlash, TrendingDown, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const StockOverview: React.FC = () => {
  const lowStockItems = getLowStockItems();
  const zeroStockItems = getZeroStockItems();
  const shopData = getShopData();

  return (
    <section id="stock-overview" className="pt-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Stock Overview</CardTitle>
              <CardDescription>Monitor inventory levels across all shops</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-danger/10 text-danger border-danger">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {lowStockItems.length} Low Stock
              </Badge>
              <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive">
                <CircleSlash className="h-3 w-3 mr-1" />
                {zeroStockItems.length} Out of Stock
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <Card className="col-span-full md:col-span-2">
          <CardHeader>
            <CardTitle>Inventory Alerts</CardTitle>
            <CardDescription>Items requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="low-stock" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="low-stock">Low Stock Items</TabsTrigger>
                <TabsTrigger value="zero-stock">Zero Stock Items</TabsTrigger>
              </TabsList>
              <TabsContent value="low-stock">
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Shop</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead>Reorder Level</TableHead>
                        <TableHead>Last Sale</TableHead>
                        <TableHead>Trend</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lowStockItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>{item.shop}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="font-bold text-danger mr-2">{item.currentStock}</span>
                              <Progress 
                                value={(item.currentStock / item.reorderLevel) * 100} 
                                className="h-2 w-16 bg-secondary"
                              />
                            </div>
                          </TableCell>
                          <TableCell>{item.reorderLevel}</TableCell>
                          <TableCell>{item.lastSale}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {item.salesTrend[0] > item.salesTrend[item.salesTrend.length - 1] ? (
                                <TrendingDown className="h-4 w-4 text-danger mr-1" />
                              ) : (
                                <TrendingUp className="h-4 w-4 text-success mr-1" />
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="zero-stock">
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Shop</TableHead>
                        <TableHead>Reorder Level</TableHead>
                        <TableHead>Last Sale</TableHead>
                        <TableHead>Trend</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {zeroStockItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>{item.shop}</TableCell>
                          <TableCell>{item.reorderLevel}</TableCell>
                          <TableCell>{item.lastSale}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <TrendingDown className="h-4 w-4 text-danger mr-1" />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="col-span-full md:col-span-1">
          <CardHeader>
            <CardTitle>Stock Heat Map</CardTitle>
            <CardDescription>Low stock distribution by shop</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shopData.map((shop) => (
                <div key={shop.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{shop.name}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-danger/10 text-danger border-danger">
                        {shop.lowStockCount}
                      </Badge>
                      <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive">
                        {shop.zeroStockCount}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {Array(shop.lowStockCount).fill(0).map((_, idx) => (
                      <div key={`low-${shop.id}-${idx}`} className="h-4 w-4 bg-danger/80 rounded-sm"></div>
                    ))}
                    {Array(shop.zeroStockCount).fill(0).map((_, idx) => (
                      <div key={`zero-${shop.id}-${idx}`} className="h-4 w-4 bg-destructive/80 rounded-sm"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between pt-4 border-t text-xs text-muted-foreground">
              <div className="flex items-center">
                <div className="h-3 w-3 bg-danger/80 rounded-sm mr-1"></div>
                <span>Low Stock</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 bg-destructive/80 rounded-sm mr-1"></div>
                <span>Zero Stock</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default StockOverview;
