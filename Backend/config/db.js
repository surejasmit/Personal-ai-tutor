const { Pool } = require("pg");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const connectionString = process.env.DATABASE_URL;
const requiresSsl =
  process.env.DB_SSL === "true" ||
  process.env.NODE_ENV === "production" ||
  (connectionString && connectionString.includes("supabase.co"));

const pool = new Pool({
  connectionString,
  ssl: requiresSsl ? { rejectUnauthorized: false } : false
});

module.exports = pool;
