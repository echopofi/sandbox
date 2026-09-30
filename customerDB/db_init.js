requre("dotenv").config()

const { Pool } = require("pg")
const { connectionString } = require("pg/lib/defaults")

const pool = new Pool({
	connectionString: process.env.DB_URL
})