require("dotenv").config()
const { Pool } = require("pg")
const pool = new Pool({
	connectionString: process.env.DB_URL
})

async function dbInitialize(){
	try {
		console.log("establishing db containner connection")
		await pool.query("SELECT NOW()")
		console.log("COnnection Successful...\n")
		console.log("Inspecting schema before table creation...\n")
		const creatTableQuery = `
			CREATE TABLE IF NOT EXISTS users (
				id SERIAL PRIMARY KEY,
				name VARCHAR(100) NOT NULL,
				email VARCHAR(150) NOT NULL,
				created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
		`
		await pool.query(creatTableQuery)
		console.log("Table created sucessfully...\n")

	} catch (err) {
		console.log("DB init failed", err.message)
	} finally {
		await pool.end()
		console.log("COnnection Successfully eneded...\n")
	}
}
dbInitialize()