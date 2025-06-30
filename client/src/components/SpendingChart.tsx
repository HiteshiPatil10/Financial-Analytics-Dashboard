
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const spendingData = [
  { name: "Food & Dining", value: 850, color: "#3B82F6" },
  { name: "Transportation", value: 620, color: "#10B981" },
  { name: "Shopping", value: 480, color: "#F59E0B" },
  { name: "Entertainment", value: 320, color: "#EF4444" },
  { name: "Bills & Utilities", value: 750, color: "#8B5CF6" },
  { name: "Healthcare", value: 220, color: "#06B6D4" }
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function SpendingChart() {
  return (
    <Card className="col-span-1 lg:col-span-2 shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Spending Breakdown</CardTitle>
        <p className="text-sm text-muted-foreground">Your expenses this month</p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={spendingData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {spendingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`$${value}`, 'Amount']}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => <span className="text-sm">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
