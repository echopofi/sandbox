require("dotenv").config()

const { Pool } = require("pg")
const { connectionString } = require("pg/lib/defaults")

const pool = new Pool({
	connectionString: process.env.DB_URL
})

console.log("STARTING DB connection...")

async function initDB(){
	console.log("\nAttempting to connect to postgresSQL container ...\n")
	try {
		await pool.query("SELECT NOW()")
		console.log("Container connection successful...\n")
		console.log("creating Table...\n")

		const createTableQuery = `
			CREATE TABLE IF NOT EXISTS users(
				id SERIAL PRIMARY KEY,
				name VARCHAR(100) NOT NULL,
				email VARCHAR(150) NOT NULL,
				created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
				);
		`

		await pool.query(createTableQuery)
		console.log("TABLE created  successfully...\n")
		console.log("DB initialized without Errors...")
	}

	catch (error) {
		console.log("DB initialization failed", error.message)
	}

	finally{
		pool.end()
		console.log("DB connection closed successfully...")
	}
}
initDB()