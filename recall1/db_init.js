require("dotenv").config()

const {  Pool } = require("pg")
const { connStr } = require("pg/lib/defaults")

const pool = new Pool({
	connStr: process.env.DB_URL
})

async function diInit() => {
	try {
		
	}
}