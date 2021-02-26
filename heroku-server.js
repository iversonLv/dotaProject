const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist/dotaProject'));
// Fo all
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/dotaProject/index.html');
});
// Start the app by listening on the default
// Heroku port
app.listen(PORT, () => {
  console.log('Static Server is running on port', PORT);
});