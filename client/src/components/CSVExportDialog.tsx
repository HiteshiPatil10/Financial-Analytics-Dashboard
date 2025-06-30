
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, FileText } from "lucide-react";
import { ExportColumn, ExportData, generateCSV, downloadCSV } from "@/utils/csvExport";

interface CSVExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: ExportData[];
  availableColumns: ExportColumn[];
  defaultFilename: string;
  title: string;
}

export function CSVExportDialog({
  open,
  onOpenChange,
  data,
  availableColumns,
  defaultFilename,
  title
}: CSVExportDialogProps) {
  const [columns, setColumns] = useState<ExportColumn[]>(availableColumns);
  const [filename, setFilename] = useState(defaultFilename);

  const handleColumnToggle = (columnKey: string) => {
    setColumns(prev => prev.map(col => 
      col.key === columnKey 
        ? { ...col, selected: !col.selected }
        : col
    ));
  };

  const handleSelectAll = () => {
    const allSelected = columns.every(col => col.selected);
    setColumns(prev => prev.map(col => ({ ...col, selected: !allSelected })));
  };

  const handleExport = () => {
    const selectedColumns = columns.filter(col => col.selected);
    if (selectedColumns.length === 0) {
      alert('Please select at least one column to export.');
      return;
    }

    const csvContent = generateCSV(data, columns);
    const finalFilename = filename.endsWith('.csv') ? filename : `${filename}.csv`;
    
    downloadCSV(csvContent, finalFilename);
    onOpenChange(false);
  };

  const selectedCount = columns.filter(col => col.selected).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Export {title} to CSV
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="filename">Filename</Label>
            <Input
              id="filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="Enter filename"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Select Columns to Export ({selectedCount} selected)</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
              >
                {columns.every(col => col.selected) ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
            
            <div className="space-y-2 max-h-48 overflow-y-auto border rounded-md p-3">
              {columns.map((column) => (
                <div key={column.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={column.key}
                    checked={column.selected}
                    onCheckedChange={() => handleColumnToggle(column.key)}
                  />
                  <Label htmlFor={column.key} className="text-sm font-normal">
                    {column.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
