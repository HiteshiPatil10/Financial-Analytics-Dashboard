import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import WalletPage from "./pages/Wallet";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import GoalsPage from "./pages/Goals";
import SavingsPage from "./pages/Savings";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* ✅ Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* ✅ Protected / Main Dashboard Routes */}
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/goals" element={<GoalsPage />} />
            <Route path="/savings" element={<SavingsPage />} />
            <Route path="/settings" element={<Settings />} />

            {/* ❌ Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  ); 
};
export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

export default App;
