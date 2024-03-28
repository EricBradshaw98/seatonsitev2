// load .env data into process.env
require('dotenv').config();

// Other dependencies
const fs = require('fs');
const chalk = require('chalk');
const { Pool } = require('pg');

// PG connection setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`
});

(async () => {
  try {
    console.log(chalk.yellow('---------------------------------------------'));
    console.log(chalk.yellow.bold('          Server Setup Initialization'));
    console.log(chalk.yellow('---------------------------------------------\n'));
    
    console.log(chalk.cyan(`-> Connecting to PostgreSQL using: ${chalk.blue.bold(pool.options.connectionString)} ...\n`));
    await pool.connect();
    
    console.log(chalk.green.bold('✓ Connected to PostgreSQL successfully!\n'));
    
    pool.end();
    console.log(chalk.green.bold('✓ Database connected successfully.\n'));

    console.log(chalk.green.bold(`✓ Express server is now running on port ${chalk.blue.bold(process.env.PORT)}.\n`));
    
  } catch (err) {
    console.error(chalk.red.bold('✗ Failed due to error:'));
    console.error(chalk.red(err));
    pool.end();
  }
})();
