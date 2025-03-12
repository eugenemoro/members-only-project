const { Pool } = require('pg');
require('dotenv').config();

module.exports = new Pool({
  connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_PATH}/${process.env.DB_NAME}`,
});