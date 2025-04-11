
// Mock data for the stock dashboard

export interface StockItem {
  id: string;
  name: string;
  category: string;
  shop: string;
  currentStock: number;
  reorderLevel: number;
  lastSale: string;
  salesTrend: number[];
}

export interface SalesData {
  date: string;
  value: number;
  shop?: string;
  category?: string;
}

export interface ShopData {
  id: string;
  name: string;
  region: string;
  targetSales: number;
  actualSales: number;
  lowStockCount: number;
  zeroStockCount: number;
}

export interface CategorySales {
  category: string;
  sales: number;
  percentage: number;
}

// Stock items data
export const getLowStockItems = (): StockItem[] => [
  { id: '1', name: 'Smartphone X', category: 'Electronics', shop: 'Downtown', currentStock: 5, reorderLevel: 10, lastSale: '2025-04-10', salesTrend: [12, 15, 10, 8, 6, 5] },
  { id: '2', name: 'Wireless Headphones', category: 'Electronics', shop: 'Uptown', currentStock: 3, reorderLevel: 8, lastSale: '2025-04-10', salesTrend: [8, 10, 7, 5, 4, 3] },
  { id: '3', name: 'Designer Jeans', category: 'Clothing', shop: 'West End', currentStock: 2, reorderLevel: 5, lastSale: '2025-04-09', salesTrend: [6, 5, 4, 3, 2, 2] },
  { id: '4', name: 'Coffee Maker', category: 'Home Goods', shop: 'Downtown', currentStock: 4, reorderLevel: 7, lastSale: '2025-04-08', salesTrend: [7, 6, 5, 5, 4, 4] },
  { id: '5', name: 'Organic Pasta', category: 'Groceries', shop: 'East Side', currentStock: 6, reorderLevel: 15, lastSale: '2025-04-10', salesTrend: [22, 20, 18, 12, 8, 6] },
  { id: '6', name: 'Action Figure', category: 'Toys', shop: 'Central', currentStock: 4, reorderLevel: 10, lastSale: '2025-04-08', salesTrend: [15, 12, 10, 7, 5, 4] },
  { id: '7', name: 'Dress Shirt', category: 'Clothing', shop: 'Downtown', currentStock: 7, reorderLevel: 12, lastSale: '2025-04-09', salesTrend: [14, 12, 10, 9, 8, 7] },
  { id: '8', name: 'Bluetooth Speaker', category: 'Electronics', shop: 'West End', currentStock: 3, reorderLevel: 6, lastSale: '2025-04-10', salesTrend: [9, 7, 6, 5, 4, 3] },
  { id: '9', name: 'Kitchen Knife Set', category: 'Home Goods', shop: 'Central', currentStock: 2, reorderLevel: 4, lastSale: '2025-04-07', salesTrend: [5, 4, 3, 3, 2, 2] },
  { id: '10', name: 'Organic Milk', category: 'Groceries', shop: 'Uptown', currentStock: 8, reorderLevel: 20, lastSale: '2025-04-10', salesTrend: [25, 22, 18, 15, 10, 8] },
];

export const getZeroStockItems = (): StockItem[] => [
  { id: '11', name: 'Premium Laptop', category: 'Electronics', shop: 'Downtown', currentStock: 0, reorderLevel: 5, lastSale: '2025-04-05', salesTrend: [6, 5, 4, 2, 1, 0] },
  { id: '12', name: 'Winter Jacket', category: 'Clothing', shop: 'East Side', currentStock: 0, reorderLevel: 8, lastSale: '2025-04-06', salesTrend: [10, 8, 5, 3, 1, 0] },
  { id: '13', name: 'Blender', category: 'Home Goods', shop: 'West End', currentStock: 0, reorderLevel: 6, lastSale: '2025-04-04', salesTrend: [7, 5, 4, 2, 1, 0] },
  { id: '14', name: 'Artisanal Cheese', category: 'Groceries', shop: 'Central', currentStock: 0, reorderLevel: 10, lastSale: '2025-04-09', salesTrend: [12, 10, 7, 4, 2, 0] },
  { id: '15', name: 'Building Blocks', category: 'Toys', shop: 'Downtown', currentStock: 0, reorderLevel: 12, lastSale: '2025-04-07', salesTrend: [15, 12, 8, 5, 3, 0] },
];

// Shop data
export const getShopData = (): ShopData[] => [
  { id: '1', name: 'Downtown', region: 'Central', targetSales: 50000, actualSales: 48500, lowStockCount: 3, zeroStockCount: 2 },
  { id: '2', name: 'Uptown', region: 'North', targetSales: 45000, actualSales: 46200, lowStockCount: 2, zeroStockCount: 0 },
  { id: '3', name: 'West End', region: 'West', targetSales: 38000, actualSales: 35600, lowStockCount: 2, zeroStockCount: 1 },
  { id: '4', name: 'East Side', region: 'East', targetSales: 42000, actualSales: 39800, lowStockCount: 1, zeroStockCount: 1 },
  { id: '5', name: 'Central', region: 'Central', targetSales: 55000, actualSales: 58200, lowStockCount: 2, zeroStockCount: 1 },
];

// Sales data
export const getDailySalesData = (): SalesData[] => [
  { date: '2025-04-01', value: 5200 },
  { date: '2025-04-02', value: 4800 },
  { date: '2025-04-03', value: 5500 },
  { date: '2025-04-04', value: 6200 },
  { date: '2025-04-05', value: 7500 },
  { date: '2025-04-06', value: 5900 },
  { date: '2025-04-07', value: 4700 },
  { date: '2025-04-08', value: 5100 },
  { date: '2025-04-09', value: 5600 },
  { date: '2025-04-10', value: 6100 },
];

// Top categories data
export const getTopCategorySales = (): CategorySales[] => [
  { category: 'Electronics', sales: 85000, percentage: 35 },
  { category: 'Clothing', sales: 65000, percentage: 26 },
  { category: 'Home Goods', sales: 45000, percentage: 18 },
  { category: 'Groceries', sales: 32000, percentage: 13 },
  { category: 'Toys', sales: 20000, percentage: 8 },
];

// Shop performance data
export const getShopPerformance = () => {
  const shops = getShopData();
  shops.sort((a, b) => (b.actualSales / b.targetSales) - (a.actualSales / a.targetSales));
  return {
    topShops: shops.slice(0, 5),
    bottomShops: [...shops].sort((a, b) => (a.actualSales / a.targetSales) - (b.actualSales / b.targetSales)).slice(0, 5),
  };
};

// Hourly sales data
export const getHourlySalesData = (): { hour: number; sales: number }[] => [
  { hour: 9, sales: 1200 },
  { hour: 10, sales: 1500 },
  { hour: 11, sales: 1800 },
  { hour: 12, sales: 2400 },
  { hour: 13, sales: 2200 },
  { hour: 14, sales: 1900 },
  { hour: 15, sales: 1700 },
  { hour: 16, sales: 2000 },
  { hour: 17, sales: 2500 },
  { hour: 18, sales: 2300 },
  { hour: 19, sales: 1800 },
  { hour: 20, sales: 1400 },
];
