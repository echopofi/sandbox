require("dotenv").config()

const { Pool } = require("pg")
const { connectionString } = require("pg/lib/defaults")

const pool = new Pool({
	connectionString: process.env.DB_URL
})

async function initializeDB(){
	try {
		console.log("establishing handshake...")
		await pool.query("SELECT NOW()")

		const createTableQuery = `CREATE TABLE IF NOT EXISTS 
		users (

		id SERIAL PRIMARY KEY,
		name VARCHAR(100) NOT NULL,
		email VARCHAR(150) NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);`

		await pool.query(createTableQuery)
	} catch (error) {
		console.log("Error init failed", error.message)
	} finally {
		await pool.end()
	}
}
initializeDB()