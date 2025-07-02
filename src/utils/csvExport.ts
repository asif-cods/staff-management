import Papa from 'papaparse'

export const exportToCsv = (data: any[], filename: string) => {
  try {
    // Convert data to CSV format
    const csv = Papa.unparse(data, {
      header: true,
      delimiter: ',',
      newline: '\r\n',
    });

    // Create a Blob with the CSV data
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    URL.revokeObjectURL(url);
    
    console.log(`CSV file "${filename}" has been exported successfully!`);
  } catch (error) {
    console.error('Error exporting CSV:', error);
    throw new Error('Failed to export CSV file');
  }
};

export const formatDataForExport = (data: any[], customHeaders?: Record<string, string>) => {
  if (!customHeaders) return data;
  
  return data.map(item => {
    const formattedItem: any = {};
    Object.keys(item).forEach(key => {
      const newKey = customHeaders[key] || key;
      formattedItem[newKey] = item[key];
    });
    return formattedItem;
  });
};