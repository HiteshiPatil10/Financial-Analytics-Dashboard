
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const portfolioData = [
  { month: "Jan", value: 58000 },
  { month: "Feb", value: 59200 },
  { month: "Mar", value: 57800 },
  { month: "Apr", value: 60500 },
  { month: "May", value: 61200 },
  { month: "Jun", value: 62450 }
];

export function PortfolioChart() {
  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">Portfolio Performance</CardTitle>
        <p className="text-sm text-gray-500">Investment growth over time</p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={portfolioData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                stroke="#64748b"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                stroke="#64748b"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
