
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from "recharts";

const portfolioData = [
  { month: "Jan", value: 58000 },
  { month: "Feb", value: 59200 },
  { month: "Mar", value: 57800 },
  { month: "Apr", value: 60500 },
  { month: "May", value: 61200 },
  { month: "Jun", value: 62450 }
];

const holdings = [
  { name: "Stocks", value: 45000, color: "#3b82f6" },
  { name: "Bonds", value: 12000, color: "#10b981" },
  { name: "ETFs", value: 8500, color: "#f59e0b" },
  { name: "Cash", value: 5000, color: "#6b7280" }
];

const Portfolio = () => {
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
                  Portfolio Overview
                </h1>
                <p className="text-gray-600">
                  Track your investment performance and asset allocation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card className="bg-white border-0 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Value</CardTitle>
                    <DollarSign className="h-4 w-4 text-gray-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">$70,500</div>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12.5% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Daily Change</CardTitle>
                    <TrendingUp className="h-4 w-4 text-gray-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">+$1,250</div>
                    <p className="text-xs text-green-600">+1.8% today</p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Gain/Loss</CardTitle>
                    <TrendingUp className="h-4 w-4 text-gray-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">+$8,500</div>
                    <p className="text-xs text-green-600">+13.7% total return</p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Holdings</CardTitle>
                    <PieChart className="h-4 w-4 text-gray-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">24</div>
                    <p className="text-xs text-gray-600">Different assets</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900">Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={portfolioData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="month" stroke="#64748b" />
                          <YAxis stroke="#64748b" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                          <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value']} />
                          <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900">Asset Allocation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <RechartsPieChart data={holdings} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                            {holdings.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </RechartsPieChart>
                          <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                      {holdings.map((holding, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: holding.color }}></div>
                            <span className="text-sm text-gray-700">{holding.name}</span>
                          </div>
                          <span className="text-sm font-medium">${holding.value.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Portfolio;
