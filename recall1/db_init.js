require("dotenv").config()
const { Pool } = require("pg")

const pool = new Pool({
	connectionString: process.env.DB_URL
})

console.log("Starting Connection ....\n")

async function dbInit() {
	console.log("Starting db pool container ....\n")

	try {
		await pool.query("SELECT NOW()")
		console.log("Container started Sucessfully....\n")
		console.log("Preparing Schema for table ....\n")

		const createTableQuery = `
			CREATE TABLE IF NOT EXISTS users(
			id SERIAL PRIMARY KEY,
			name VARCHAR(100) NOT NULL,
			email VARCHAR(150) NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			);
		`
		console.log("Creating table ....\n")
		await pool.query(createTableQuery)
		console.log("Table created successfully ....\nDB initialized without error")
	} catch (err){
		console.log("DB init failed", err.message)
	} finally {
		pool.end()
		console.log("Connection Pool closed sucessfully ....\n")
	}
}

dbInit()