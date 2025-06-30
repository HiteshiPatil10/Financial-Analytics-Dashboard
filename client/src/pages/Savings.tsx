
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PiggyBank, TrendingUp, Calendar, Plus } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const savingsData = [
  { month: "Jan", amount: 1200 },
  { month: "Feb", amount: 1450 },
  { month: "Mar", amount: 1350 },
  { month: "Apr", amount: 1600 },
  { month: "May", amount: 1800 },
  { month: "Jun", amount: 2100 }
];

const savingsAccounts = [
  { name: "High-Yield Savings", balance: 25400, rate: 4.5, type: "savings" },
  { name: "Emergency Fund", balance: 10200, rate: 3.8, type: "emergency" },
  { name: "Vacation Fund", balance: 3200, rate: 4.2, type: "goal" },
  { name: "Investment Account", balance: 15600, rate: 7.2, type: "investment" }
];

const SavingsPage = () => {
  const totalSavings = savingsAccounts.reduce((sum, account) => sum + account.balance, 0);
  const monthlyGrowth = 1850; // This month's growth
  const averageRate = savingsAccounts.reduce((sum, account) => sum + account.rate, 0) / savingsAccounts.length;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          
          <main className="flex-1 p-6 overflow-auto bg-gray-50">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Savings & Investments
                  </h1>
                  <p className="text-gray-600">
                    Monitor your savings growth and investment performance.
                  </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Account
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="bg-white border-0 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Savings</CardTitle>
                    <PiggyBank className="h-4 w-4 text-gray-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">
                      ${totalSavings.toLocaleString()}
                    </div>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12.5% this year
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Monthly Growth</CardTitle>
                    <TrendingUp className="h-4 w-4 text-gray-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      +${monthlyGrowth.toLocaleString()}
                    </div>
                    <p className="text-xs text-gray-600">This month</p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Average Return</CardTitle>
                    <Calendar className="h-4 w-4 text-gray-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">
                      {averageRate.toFixed(1)}%
                    </div>
                    <p className="text-xs text-gray-600">Annual rate</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card className="bg-white border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900">Savings Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={savingsData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="month" stroke="#64748b" />
                          <YAxis stroke="#64748b" tickFormatter={(value) => `$${value}`} />
                          <Tooltip formatter={(value: number) => [`$${value}`, 'Savings']} />
                          <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900">Savings Accounts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {savingsAccounts.map((account, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h3 className="font-medium text-gray-900">{account.name}</h3>
                            <p className="text-sm text-gray-600">{account.rate}% APY</p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">
                              ${account.balance.toLocaleString()}
                            </div>
                            <div className="text-sm text-green-600">
                              +${(account.balance * account.rate / 100 / 12).toFixed(0)}/mo
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">Savings Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Automate Savings</h4>
                      <p className="text-sm text-blue-700">Set up automatic transfers to build savings consistently.</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">High-Yield Accounts</h4>
                      <p className="text-sm text-green-700">Maximize returns with high-interest savings accounts.</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-900 mb-2">Emergency Fund</h4>
                      <p className="text-sm text-purple-700">Maintain 3-6 months of expenses for emergencies.</p>
                    </div>
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

export default SavingsPage;
