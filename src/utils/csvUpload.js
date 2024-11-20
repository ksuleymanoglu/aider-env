export const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const text = event.target.result;
      // Handle different line endings (CRLF, LF)
      const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
      
      // Remove header row and empty lines
      const data = lines
        .slice(1)
        .filter(line => line.trim())
        .map(line => {
          // Handle possible quoted fields
          const fields = line.split(',').map(field => {
            const trimmed = field.trim();
            // Remove quotes if present
            return trimmed.replace(/^["'](.*)["']$/, '$1');
          });
          
          const [name, email, phone] = fields;
          return { name, email, phone };
        });
      
      resolve(data);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
};
