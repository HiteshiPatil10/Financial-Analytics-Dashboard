import {
  ArrowUpRight,
  ArrowDownLeft,
  ShoppingBag,
  Car,
  Home,
  Utensils,
  Download,
} from "lucide-react";
import { useEffect, useState } from "react";
import API from "@/lib/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CSVExportDialog } from "@/components/CSVExportDialog";
import { ExportColumn, ExportData } from "@/utils/csvExport";
import { PlusCircle } from "lucide-react"; // ✅ Add PlusCircle
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // ✅ Ensure you have this
import { Input } from "@/components/ui/input"; // ✅ for form fields
import { Label } from "@/components/ui/label";

// Define icon mapping
const iconMap: Record<string, any> = {
  Food: Utensils,
  Transport: Car,
  Shopping: ShoppingBag,
  Bills: Home,
  Salary: ArrowUpRight,
};

const colorMap: Record<string, string> = {
  Food: "text-orange-500",
  Transport: "text-blue-500",
  Shopping: "text-purple-500",
  Bills: "text-blue-600",
  Salary: "text-green-500",
};

const exportColumns: ExportColumn[] = [
  { key: "amount", label: "Amount", selected: true },
  { key: "date", label: "Date", selected: true },
  { key: "category", label: "Category", selected: true },
  { key: "status", label: "Status", selected: true },
  { key: "description", label: "Description", selected: true },
  { key: "type", label: "Type", selected: false },
  { key: "user", label: "User", selected: false },
];

export function RecentTransactions() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  // Add state for add dialog and form
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [form, setForm] = useState({
    type: "expense",
    category: "",
    amount: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(res.data.transactions);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Handle form field changes
  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Handle add transaction form submit
  async function handleAddTransaction(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await API.post(
        "/transactions",
        {
          ...form,
          amount: Number(form.amount),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTransactions((prev) => [res.data.transaction, ...prev]);
      setAddDialogOpen(false);
      setForm({
        type: "expense",
        category: "",
        amount: "",
        description: "",
        date: "",
      });
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  }

  const exportData: ExportData[] = transactions.map((t) => ({
    amount: t.amount,
    date: t.date,
    category: t.category,
    status: t.status,
    description: t.description,
    type: t.type,
    user: t.user || "Anonymous",
  }));

  if (loading) {
    return <p className="text-center py-4">Loading transactions...</p>;
  }


  return (
    <>
      <Card className="shadow-lg border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Recent Transactions</CardTitle>
              <p className="text-sm text-muted-foreground">
                Your latest financial activity
              </p>
            </div>
            <Button
              onClick={() => setExportDialogOpen(true)}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4 custom-scrollbar max-h-96 overflow-y-auto">
            {transactions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No transactions found.</p>
            ) : (
              transactions.map((transaction, index) => {
                const Icon = iconMap[transaction.category] || Utensils;
                const color = colorMap[transaction.category] || "text-muted-foreground";
                return (
                  <div
                    key={transaction._id || index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center ${color}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {transaction.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {transaction.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          transaction.amount > 0 ? "text-success" : "text-foreground"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      {transaction.amount > 0 && (
                        <ArrowUpRight className="w-4 h-4 text-success inline ml-1" />
                      )}
                      {transaction.amount < 0 && (
                        <ArrowDownLeft className="w-4 h-4 text-muted-foreground inline ml-1" />
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      <CSVExportDialog
        open={exportDialogOpen}
        onOpenChange={setExportDialogOpen}
        data={exportData}
        availableColumns={exportColumns}
        defaultFilename="transactions-export"
        title="Transactions"
      />
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add New Transaction</DialogTitle>
    </DialogHeader>

    <form className="space-y-4" onSubmit={handleAddTransaction}>
      <div>
        <Label htmlFor="type">Type</Label>
        <select name="type" value={form.type} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Input name="category" value={form.category} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input name="amount" type="number" value={form.amount} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Input name="description" value={form.description} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="date">Date</Label>
        <Input name="date" type="date" value={form.date} onChange={handleChange} />
      </div>

      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
        Add Transaction
      </button>
    </form>
  </DialogContent>
</Dialog>
<Button
  onClick={() => setAddDialogOpen(true)}
  variant="default"
  size="sm"
  className="flex items-center gap-2 ml-2"
>
  <PlusCircle className="w-4 h-4" />
  Add Transaction
</Button>

      
    </>
  );
}

