
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";
import { AnalyticsChart } from "@/components/AnalyticsChart";
import React from "react";

const monthlyData = [
  { month: "Jan", income: 4200, expenses: 3100, savings: 1100 },
  { month: "Feb", income: 4200, expenses: 2800, savings: 1400 },
  { month: "Mar", income: 4500, expenses: 3200, savings: 1300 },
  { month: "Apr", income: 4200, expenses: 2900, savings: 1300 },
  { month: "May", income: 4200, expenses: 3400, savings: 800 },
  { month: "Jun", income: 4800, expenses: 3100, savings: 1700 }
];

const categoryData = [
  { category: "Food", amount: 450, percentage: 25 },
  { category: "Transportation", amount: 320, percentage: 18 },
  { category: "Entertainment", amount: 280, percentage: 16 },
  { category: "Bills", amount: 520, percentage: 29 },
  { category: "Shopping", amount: 210, percentage: 12 }
];

const Analytics = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          
          <main className="flex-1 p-6 overflow-auto bg-gray-50">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Analytics & Insights
                </h1>
                <p className="text-gray-600">
                  Detailed analysis of your financial patterns and trends.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card className="bg-white border-0 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Avg Monthly Income</CardTitle>
                    <DollarSign className="h-4 w-4 text-gray-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">$4,350</div>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +5.2% from last period
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Avg Monthly Expenses</CardTitle>
                    <TrendingDown className="h-4 w-4 text-gray-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">$3,100</div>
                    <p className="text-xs text-red-600">+2.1% from last period</p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Savings Rate</CardTitle>
                    <Target className="h-4 w-4 text-gray-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">28.7%</div>
                    <p className="text-xs text-green-600">Above target of 25%</p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Budget Variance</CardTitle>
                    <TrendingUp className="h-4 w-4 text-gray-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">-8.3%</div>
                    <p className="text-xs text-green-600">Under budget</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card className="bg-white border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900">Income vs Expenses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="month" stroke="#64748b" />
                          <YAxis stroke="#64748b" />
                          <Tooltip />
                          <Bar dataKey="income" fill="#10b981" name="Income" />
                          <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900">Savings Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="month" stroke="#64748b" />
                          <YAxis stroke="#64748b" />
                          <Tooltip formatter={(value: number) => [`$${value}`, 'Savings']} />
                          <Line type="monotone" dataKey="savings" stroke="#3b82f6" strokeWidth={3} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">Spending by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryData.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-blue-600 rounded"></div>
                          <span className="font-medium text-gray-900">{category.category}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${category.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700 w-16 text-right">
                            ${category.amount}
                          </span>
                          <span className="text-sm text-gray-500 w-12 text-right">
                            {category.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;
