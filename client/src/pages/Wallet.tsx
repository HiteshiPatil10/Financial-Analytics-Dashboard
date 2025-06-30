
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, CreditCard, Banknote, Send, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const accounts = [
  { name: "Checking Account", balance: 12450, type: "checking", last4: "1234" },
  { name: "Savings Account", balance: 35600, type: "savings", last4: "5678" },
  { name: "Credit Card", balance: -2340, type: "credit", last4: "9012" },
];

const recentActivity = [
  { id: 1, description: "Transfer to Savings", amount: 500, date: "2024-01-15", type: "transfer" },
  { id: 2, description: "ATM Withdrawal", amount: -100, date: "2024-01-14", type: "withdrawal" },
  { id: 3, description: "Direct Deposit", amount: 3200, date: "2024-01-12", type: "deposit" },
  { id: 4, description: "Online Purchase", amount: -85.50, date: "2024-01-11", type: "purchase" },
];

const WalletPage = () => {
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
                  Wallet & Accounts
                </h1>
                <p className="text-gray-600">
                  Manage your bank accounts and financial transactions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {accounts.map((account, index) => (
                  <Card key={index} className="bg-white border-0 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">{account.name}</CardTitle>
                      {account.type === 'credit' ? <CreditCard className="h-4 w-4 text-gray-600" /> : <Banknote className="h-4 w-4 text-gray-600" />}
                    </CardHeader>
                    <CardContent>
                      <div className={`text-2xl font-bold ${account.balance < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                        ${Math.abs(account.balance).toLocaleString()}
                      </div>
                      <p className="text-xs text-gray-600">****{account.last4}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 bg-white border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              activity.type === 'deposit' ? 'bg-green-100' : 
                              activity.type === 'withdrawal' ? 'bg-red-100' : 
                              'bg-blue-100'
                            }`}>
                              {activity.type === 'deposit' ? <Download className="h-4 w-4 text-green-600" /> :
                               activity.type === 'withdrawal' ? <Send className="h-4 w-4 text-red-600" /> :
                               <Wallet className="h-4 w-4 text-blue-600" />}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{activity.description}</p>
                              <p className="text-sm text-gray-500">{activity.date}</p>
                            </div>
                          </div>
                          <div className={`font-semibold ${activity.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {activity.amount < 0 ? '-' : '+'}${Math.abs(activity.amount).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Send className="w-4 h-4 mr-2" />
                      Send Money
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Request Money
                    </Button>
                    <Button variant="outline" className="w-full">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay Bills
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Wallet className="w-4 h-4 mr-2" />
                      Add Account
                    </Button>
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

export default WalletPage;
