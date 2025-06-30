
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const overviewData = [
  {
    title: "Total Balance",
    value: "$84,692.50",
    change: "+12.5%",
    trend: "up",
    icon: Wallet,
    gradient: "from-blue-500 to-blue-600"
  },
  {
    title: "Portfolio Value",
    value: "$62,450.00",
    change: "+8.2%",
    trend: "up",
    icon: TrendingUp,
    gradient: "from-green-500 to-green-600"
  },
  {
    title: "Monthly Spending",
    value: "$3,240.80",
    change: "-5.1%",
    trend: "down",
    icon: TrendingDown,
    gradient: "from-orange-500 to-orange-600"
  },
  {
    title: "Savings Goal",
    value: "$15,000.00",
    change: "68% complete",
    trend: "up",
    icon: PiggyBank,
    gradient: "from-purple-500 to-purple-600"
  }
];

export function OverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {overviewData.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card 
            key={item.title}
            className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center shadow-sm`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  item.trend === 'up' ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {item.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {item.change}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {item.value}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.title}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
