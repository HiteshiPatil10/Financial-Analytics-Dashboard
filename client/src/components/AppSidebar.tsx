
import { useState } from "react";
import { 
  LayoutDashboard, 
  Wallet, 
  TrendingUp, 
  CreditCard, 
  Target, 
  Settings,
  ChevronLeft,
  PiggyBank,
  BarChart3
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Portfolio", url: "/portfolio", icon: TrendingUp },
  { title: "Wallet", url: "/wallet", icon: Wallet },
  { title: "Transactions", url: "/transactions", icon: CreditCard },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Goals", url: "/goals", icon: Target },
  { title: "Savings", url: "/savings", icon: PiggyBank },
];

const settingsItems = [
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar
      className="border-r bg-white"
      collapsible="icon"
    >
      <SidebarContent className="px-4 py-6">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <Wallet className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-gray-900">FinanceHub</h1>
              <p className="text-xs text-gray-500">Wealth Management</p>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <SidebarGroup className="mb-6">
          {!collapsed && (
            <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Main
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive 
                            ? "bg-blue-50 text-blue-700 font-medium" 
                            : "text-gray-700 hover:bg-gray-50"
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Account
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink 
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive 
                            ? "bg-blue-50 text-blue-700 font-medium" 
                            : "text-gray-700 hover:bg-gray-50"
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
