
import { Target, Car, Home, Plane } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const goals = [
  {
    id: 1,
    title: "Emergency Fund",
    target: 15000,
    current: 10200,
    icon: Target,
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "New Car",
    target: 35000,
    current: 18500,
    icon: Car,
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "House Down Payment",
    target: 80000,
    current: 32000,
    icon: Home,
    color: "bg-purple-500"
  },
  {
    id: 4,
    title: "Vacation Fund",
    target: 5000,
    current: 3200,
    icon: Plane,
    color: "bg-orange-500"
  }
];

export function GoalsProgress() {
  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">Savings Goals</CardTitle>
        <p className="text-sm text-gray-500">Track your progress</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.map((goal) => {
            const Icon = goal.icon;
            const progress = (goal.current / goal.target) * 100;
            
            return (
              <div key={goal.id}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${goal.color} flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">{goal.title}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    {progress.toFixed(0)}%
                  </span>
                </div>
                <Progress value={progress} className="h-2 mb-2" />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>${goal.current.toLocaleString()}</span>
                  <span>${goal.target.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
