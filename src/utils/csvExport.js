export const exportToCSV = (customers, filename) => {
  // Define CSV headers
  const headers = ['Name', 'Email', 'Phone'];
  
  // Helper function to escape and quote CSV fields
  const escapeField = (field) => {
    // If field contains commas, quotes, or newlines, wrap in quotes and escape existing quotes
    if (/[",\n\r]/.test(field)) {
      return `"${field.replace(/"/g, '""')}"`;
    }
    return field;
  };

  // Convert customer data to CSV rows
  const customerData = customers.map(customer => [
    escapeField(customer.name),
    escapeField(customer.email),
    escapeField(customer.phone)
  ]);
  
  // Combine headers and data
  const csvContent = [
    headers.map(escapeField).join(','),
    ...customerData.map(row => row.join(','))
  ].join('\r\n'); // Use Windows-style line endings for better compatibility
  
  // Create blob with UTF-8 BOM and download
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
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
