export const exportToCSV = (customers, filename) => {
  // Define CSV headers
  const headers = ['Name', 'Email', 'Phone'];
  
  // Convert customer data to CSV rows
  const customerData = customers.map(customer => [
    customer.name,
    customer.email,
    customer.phone
  ]);
  
  // Combine headers and data
  const csvContent = [
    headers.join(','),
    ...customerData.map(row => row.join(','))
  ].join('\n');
  
  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  // Create download link
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};
