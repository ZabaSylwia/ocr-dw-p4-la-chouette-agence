/* eslint-disable import/no-unresolved */
/**
 * Load Modules
 */
const express = require('express');

const app = express();
const port = 8000;

/**
 * Get Route `/` (dist/* .html)
 */
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/dist/`);
});

/**
 * Setting middleware for serves resources from `dist` folder
 */
app.use(express.static('dist'));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
