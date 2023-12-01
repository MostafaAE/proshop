const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();
const app = require('./app');

connectDB(); // Connect to MongoDB

// START SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
