import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CSVExportDialog } from "@/components/CSVExportDialog";
import { useEffect, useState } from "react";
import { ExportColumn, ExportData } from "@/utils/csvExport";

const exportColumns: ExportColumn[] = [
  { key: "amount", label: "Amount", selected: true },
  { key: "date", label: "Date", selected: true },
  { key: "category", label: "Category", selected: true },
  { key: "status", label: "Status", selected: true },
  { key: "description", label: "Description", selected: true },
  { key: "type", label: "Type", selected: false },
  { key: "user", label: "User", selected: false },
];

const Transactions = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "amount" | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setTransactions(data.transactions || []);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions
    .filter(
      (txn) =>
        txn.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.user_id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (txn) =>
        (!filterCategory || txn.category === filterCategory) &&
        (!filterStatus || txn.status === filterStatus)
    );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (!sortBy) return 0;

    const aValue = sortBy === "amount" ? a.amount : new Date(a.date).getTime();
    const bValue = sortBy === "amount" ? b.amount : new Date(b.date).getTime();

    return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
  });

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const paginatedTransactions = sortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const exportData: ExportData[] = paginatedTransactions.map((transaction) => ({
    amount: transaction.amount,
    date: transaction.date,
    category: transaction.category,
    status: transaction.status,
    description: transaction.description || "",
    type: transaction.type || "",
    user: transaction.user_id,
  }));

  if (loading) return <div className="p-8 text-center">Loading transactions...</div>;

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
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Transactions</h1>
                  <p className="text-gray-600">View and manage all your financial transactions.</p>
                </div>
                <Button
                  onClick={() => setExportDialogOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>

              <Card className="bg-white border-0 shadow-sm">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <CardTitle className="text-xl font-semibold text-gray-900">All Transactions</CardTitle>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search transactions..."
                          className="pl-10 w-64"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        <ArrowUpDown className="w-4 h-4 mr-2" />
                        Sort
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-4">
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="p-2 border rounded text-sm"
                    >
                      <option value="">All Categories</option>
                      {Array.from(new Set(transactions.map((t) => t.category))).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>

                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="p-2 border rounded text-sm"
                    >
                      <option value="">All Status</option>
                      {Array.from(new Set(transactions.map((t) => t.status))).map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th
                            className="text-left py-3 px-4 font-medium text-gray-700 cursor-pointer"
                            onClick={() => {
                              setSortBy("date");
                              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                            }}
                          >
                            Date <ArrowUpDown className="inline w-4 h-4" />
                          </th>
                          <th
                            className="text-right py-3 px-4 font-medium text-gray-700 cursor-pointer"
                            onClick={() => {
                              setSortBy("amount");
                              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                            }}
                          >
                            Amount <ArrowUpDown className="inline w-4 h-4" />
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Description</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                          <th className="text-center py-3 px-4 font-medium text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedTransactions.map((transaction) => (
                          <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm text-gray-600">{transaction.date}</td>
                            <td className={`py-3 px-4 text-right font-semibold ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                              {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-medium text-gray-900">
                                {transaction.description || "—"}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                {transaction.category}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                transaction.status === "Paid"
                                  ? "bg-green-100 text-green-800"
                                  : transaction.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}>
                                {transaction.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="mt-6 flex justify-center items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>

                      {[...Array(totalPages)].map((_, index) => (
                        <Button
                          key={index}
                          size="sm"
                          variant={currentPage === index + 1 ? "default" : "outline"}
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </Button>
                      ))}

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
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
        defaultFilename="filtered-transactions"
        title="Filtered Transactions"
      />
    </SidebarProvider>
  );
};

export default Transactions;
