import { useEffect, useState } from "react";
import API from "@/lib/api";
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#4F46E5", "#22C55E", "#F97316", "#EC4899", "#0EA5E9", "#F43F5E", "#8B5CF6"];

export function AnalyticsChart() {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const res = await API.get("/transactions", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTransactions(res.data.transactions);
    };
    fetchData();
  }, []);

  const categoryData = Object.values(
    transactions.reduce((acc, txn) => {
      if (txn.type === "expense") {
        acc[txn.category] = acc[txn.category] || { name: txn.category, value: 0 };
        acc[txn.category].value += txn.amount;
      }
      return acc;
    }, {} as Record<string, { name: string; value: number }>)
  );

  const trendData = transactions.reduce((acc: any[], txn) => {
    const date = new Date(txn.date).toLocaleDateString();
    const existing = acc.find((d) => d.date === date);
    if (!existing) {
      acc.push({
        date,
        income: txn.type === "income" ? txn.amount : 0,
        expense: txn.type === "expense" ? txn.amount : 0
      });
    } else {
      if (txn.type === "income") existing.income += txn.amount;
      if (txn.type === "expense") existing.expense += txn.amount;
    }
    return acc;
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="bg-white shadow-sm p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Expense Breakdown by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {categoryData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white shadow-sm p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Revenue vs Expenses</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#22C55E" name="Income" />
            <Line type="monotone" dataKey="expense" stroke="#EF4444" name="Expense" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
