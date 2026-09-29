require("dotenv").config()

const { Pool } = require("pg")
const { connectionString } = require("pg/lib/defaults")

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
})

async function initializeDB() {
	console.log("---Starting Database Connection----")

	try {
		console.log("---Establishing Connection to PostgresSQL container---")

		await pool.query("SELECT NOW()")
		console.log("[SUCCESS] Connected to PostgresSQL successfully")

		console.log("---Checking and creating 'users' table schema----")
		const createTableQuery = `
			CREATE TABLE IF NOT EXISTS users (
				id SERIAL PRIMARY KEY,
				name VARCHAR(100) NOT NULL,
				email VARCHAR(150) UNIQUE NOT NULL,
				created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			);
		`

		await pool.query(createTableQuery)

		console.log("[SUCCESS] Table 'users' is verified and ready")
		console.log("---DB Setup Completed Without Errors ---")

	} catch (err) {
		console.error("[ERROR] Failed to initialize DB", err.message)
	} finally {
		await pool.end()
		console.log("[INFO] DB Connection pool closed safely")
	}
}

initializeDB()