
export interface ExportColumn {
  key: string;
  label: string;
  selected: boolean;
}

export interface ExportData {
  [key: string]: string | number;
}

export const generateCSV = (data: ExportData[], columns: ExportColumn[]): string => {
  const selectedColumns = columns.filter(col => col.selected);
  
  // Create header row
  const headers = selectedColumns.map(col => col.label).join(',');
  
  // Create data rows
  const rows = data.map(item => 
    selectedColumns.map(col => {
      const value = item[col.key];
      // Handle values that might contain commas or quotes
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }).join(',')
  );
  
  return [headers, ...rows].join('\n');
};

export const downloadCSV = (csvContent: string, filename: string): void => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};
