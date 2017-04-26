const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;
const app = express();

// Set root
app.use(express.static(path.join(__dirname, '')));

// Route all requests to index.html -- app will handle routing.
app.get('*', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Start app
app.listen(port, function() {
  console.log('Server is up and running on port ' + port);
});
