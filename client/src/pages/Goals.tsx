import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Target, Car, Home, Plane, Plus, Edit, Trash2, Download } from "lucide-react";
import { CSVExportDialog } from "@/components/CSVExportDialog";
import { useState } from "react";
import { ExportColumn, ExportData } from "@/utils/csvExport";

const goals = [
  {
    id: 1,
    title: "Emergency Fund",
    description: "6 months of expenses saved",
    target: 15000,
    current: 10200,
    deadline: "2024-12-31",
    icon: Target,
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "New Car",
    description: "Save for a reliable vehicle",
    target: 35000,
    current: 18500,
    deadline: "2025-06-30",
    icon: Car,
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "House Down Payment",
    description: "20% down payment for home",
    target: 80000,
    current: 32000,
    deadline: "2026-12-31",
    icon: Home,
    color: "bg-purple-500"
  },
  {
    id: 4,
    title: "Vacation Fund",
    description: "European vacation savings",
    target: 5000,
    current: 3200,
    deadline: "2024-08-15",
    icon: Plane,
    color: "bg-orange-500"
  }
];

const GoalsPage = () => {
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  // Prepare data for CSV export
  const exportData: ExportData[] = goals.map(goal => ({
    id: goal.id,
    title: goal.title,
    description: goal.description,
    target: goal.target,
    current: goal.current,
    remaining: goal.target - goal.current,
    progress: parseFloat(((goal.current / goal.target) * 100).toFixed(1)),
    deadline: goal.deadline,
    icon: goal.icon.name
  }));

  const exportColumns: ExportColumn[] = [
    { key: 'id', label: 'ID', selected: true },
    { key: 'title', label: 'Goal Title', selected: true },
    { key: 'description', label: 'Description', selected: true },
    { key: 'target', label: 'Target Amount ($)', selected: true },
    { key: 'current', label: 'Current Amount ($)', selected: true },
    { key: 'remaining', label: 'Remaining Amount ($)', selected: true },
    { key: 'progress', label: 'Progress (%)', selected: true },
    { key: 'deadline', label: 'Deadline', selected: true },
    { key: 'icon', label: 'Icon', selected: false }
  ];

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
                    Financial Goals
                  </h1>
                  <p className="text-gray-600">
                    Track and manage your savings goals and milestones.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setExportDialogOpen(true)}
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Goal
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {goals.map((goal) => {
                  const Icon = goal.icon;
                  const progress = (goal.current / goal.target) * 100;
                  const remaining = goal.target - goal.current;
                  
                  return (
                    <Card key={goal.id} className="bg-white border-0 shadow-sm">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-lg ${goal.color} flex items-center justify-center`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-lg font-semibold text-gray-900">{goal.title}</CardTitle>
                              <p className="text-sm text-gray-600">{goal.description}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">
                              Progress: {progress.toFixed(1)}%
                            </span>
                            <span className="text-sm text-gray-500">
                              Target: {goal.deadline}
                            </span>
                          </div>
                          <Progress value={progress} className="h-3" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-lg font-bold text-gray-900">
                              ${goal.current.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-600">Current</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-lg font-bold text-gray-900">
                              ${remaining.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-600">Remaining</div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1" size="sm">
                            Add Funds
                          </Button>
                          <Button variant="outline" className="flex-1" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">Goal Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        ${goals.reduce((sum, goal) => sum + goal.current, 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Total Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        ${goals.reduce((sum, goal) => sum + goal.target, 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Total Target</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {((goals.reduce((sum, goal) => sum + goal.current, 0) / goals.reduce((sum, goal) => sum + goal.target, 0)) * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600">Overall Progress</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>

      <CSVExportDialog
        open={exportDialogOpen}
        onOpenChange={setExportDialogOpen}
        data={exportData}
        availableColumns={exportColumns}
        defaultFilename="financial-goals-report"
        title="Goals"
      />
    </SidebarProvider>
  );
};

export default GoalsPage;
