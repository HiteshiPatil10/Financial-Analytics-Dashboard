
import { Bell, Search, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardHeader() {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-gray-500 hover:text-gray-700" />
        <div className="hidden md:flex items-center gap-2 relative">
          <Search className="w-4 h-4 absolute left-3 text-gray-400" />
          <Input 
            placeholder="Search transactions, stocks..." 
            className="pl-10 w-80 bg-gray-50 border-gray-200 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-gray-700">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback className="bg-blue-500 text-white">
                  JD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex flex-col space-y-1 p-2">
              <p className="text-sm font-medium leading-none">John Doe</p>
              <p className="text-xs leading-none text-gray-500">
                john.doe@example.com
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

<button
  onClick={handleLogout}
  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
>
  Logout
</button>
export default DashboardHeader;