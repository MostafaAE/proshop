const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 12),
    role: 'admin',
  },
  {
    name: 'John Doe',
    email: 'john@email.com',
    password: bcrypt.hashSync('123456', 12),
    role: 'user',
  },
  {
    name: 'Jane doe',
    email: 'jane@email.com',
    password: bcrypt.hashSync('123456', 12),
    role: 'user',
  },
];

module.exports = users;
