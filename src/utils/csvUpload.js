export const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split('\n');
      
      // Remove header row and empty lines
      const data = lines
        .slice(1)
        .filter(line => line.trim())
        .map(line => {
          const [name, email, phone] = line.split(',').map(field => field.trim());
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
