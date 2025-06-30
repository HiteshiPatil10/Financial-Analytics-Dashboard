
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { OverviewCards } from "@/components/OverviewCards";
import { SpendingChart } from "@/components/SpendingChart";
import { PortfolioChart } from "@/components/PortfolioChart";
import { RecentTransactions } from "@/components/RecentTransactions";
import { GoalsProgress } from "@/components/GoalsProgress";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!user || !user.email) {
      navigate("/login");
    }
  }, [user, navigate]);

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
  Welcome back, {user?.name || "User"}! 
</h1>

                <p className="text-gray-600">
                  Here's what's happening with your finances today.
                </p>
              </div>

              <OverviewCards />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <SpendingChart />
                </div>
                <div className="lg:col-span-1">
                  <RecentTransactions />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <PortfolioChart />
                </div>
                <div className="lg:col-span-1">
                  <GoalsProgress />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
