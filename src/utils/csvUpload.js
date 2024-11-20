export const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const text = event.target.result.replace(/^\uFEFF/, ''); // Remove BOM if present
      // Handle different line endings (CRLF, LF)
      const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
      
      // Remove header row and empty lines
      const data = lines
        .slice(1)
        .filter(line => line.trim())
        .map(line => {
          let fields = [];
          let field = '';
          let inQuotes = false;
          
          // Parse CSV properly handling quoted fields
          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
              if (inQuotes && line[i + 1] === '"') {
                field += '"';
                i++;
              } else {
                inQuotes = !inQuotes;
              }
            } else if (char === ',' && !inQuotes) {
              fields.push(field.trim());
              field = '';
            } else {
              field += char;
            }
          }
          fields.push(field.trim());
          
          const [name, email, phone] = fields.map(f => f.replace(/^["'](.*)["']$/, '$1'));
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
