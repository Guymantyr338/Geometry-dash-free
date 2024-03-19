// Import required modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the hostname and port number
const hostname = '127.0.0.1'; // localhost
const port = 3000;

// Create the HTTP server
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/upload') {
    // Handle file upload
    let filePath = path.join(__dirname, 'uploads', 'uploaded_file.txt');
    let writeStream = fs.createWriteStream(filePath);

    req.on('data', (chunk) => {
      writeStream.write(chunk);
    });

    req.on('end', () => {
      writeStream.end();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('File uploaded successfully!\n');
    });
  } else {
    // Handle other requests
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found\n');
  }
});

// Start the server and listen on the specified port and hostname
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});