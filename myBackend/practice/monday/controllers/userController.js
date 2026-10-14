const pool = require("../config/db")

const getUsers = async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM users ORDER BY id DESC;")

		res.status(200).json({
			success: true,
			count: result.rows.length,
			data: result.rows
		})
	} catch (err) {
		console.log("fetchin failed", err.message)
	}
}

const creatUser = async (req, res) => {
	const { name, email } = req.body

	try {
		const insertQuery = `
			INSERT INTO users
			VALUES ($1, $2)
			RETURNING *; 
		`

		const values = [name, email]
		const result = await pool.query(insertQuery, values)

		res.status(201).json({
			success: true,
			message: "User created",
			data: result.rows[0]
		})
	} catch (err) {
		console.log("User creation failed", err.message)
		res.status(500).json({
			success: false,
			message: "Internal error"

		})
	}
}