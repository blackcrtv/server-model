const mysql = require("mysql");

// MySQL connection configuration
const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
};

const mysqlPool = mysql.createPool(dbConfig);

// Function to execute queries using the connection pool
/**
 * 
 * @param {String} query Params format ?
 * @param {Array} params [param1, param2]
 * @returns 
 */
async function executeQuery(query, params) {
  return new Promise((resolve, reject) => {
    mysqlPool.query(query, params, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Close the MySQL connection pool when the application exits
process.on('exit', () => {
  mysqlPool.end((err) => {
    if (err) {
      console.error('Error closing MySQL pool:', err.message);
    } else {
      console.log('MySQL pool closed');
    }
  });
});

// Handle process termination signals (e.g., Ctrl+C)
process.on('SIGINT', () => {
  process.exit();
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  process.exit(1);
});

module.exports = { executeQuery };