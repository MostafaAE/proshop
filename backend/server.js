const dotenv = require('dotenv');

dotenv.config();

const app = require('./app');

// START SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
