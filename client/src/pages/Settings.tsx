
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Shield, CreditCard, Moon, Sun } from "lucide-react";

const Settings = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader />
          
          <main className="flex-1 p-6 overflow-auto bg-gray-50">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Settings
                </h1>
                <p className="text-gray-600">
                  Manage your account preferences and security settings.
                </p>
              </div>

              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-600">Receive updates via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Transaction Alerts</Label>
                      <p className="text-sm text-gray-600">Get notified of new transactions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Budget Warnings</Label>
                      <p className="text-sm text-gray-600">Alert when approaching budget limits</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Goal Updates</Label>
                      <p className="text-sm text-gray-600">Progress updates on savings goals</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Security & Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-600">Add an extra layer of security</p>
                    </div>
                    <Switch />
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Connected Accounts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Chase Checking</h4>
                      <p className="text-sm text-gray-600">****1234 • Connected</p>
                    </div>
                    <Button variant="outline" size="sm">Disconnect</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Wells Fargo Savings</h4>
                      <p className="text-sm text-gray-600">****5678 • Connected</p>
                    </div>
                    <Button variant="outline" size="sm">Disconnect</Button>
                  </div>
                  <Button variant="outline" className="w-full">
                    + Connect New Account
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
                    <Sun className="w-5 h-5 mr-2" />
                    Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Dark Mode</Label>
                      <p className="text-sm text-gray-600">Switch to dark theme</p>
                    </div>
                    <Switch />
                  </div>
                  <div>
                    <Label htmlFor="currency">Default Currency</Label>
                    <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                      <option>JPY (¥)</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
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

export default Settings;
