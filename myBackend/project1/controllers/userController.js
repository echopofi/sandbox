//business logic /Controller
const pool = require("../config/db")

const getUsers = async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM users ORDER BY id DESC")

		res.status(200).json({
			success: true,
			count: result.rows.length,
			data: result.rows
		})
	} catch (error) {
		console.error("Error fetching users:", error.message)
		res.status(500).json({
			success: false,
			message: "Internal Server error"
		})
	}
}

const createUser = async (req, res)=>{
	const { name, email } = req.body

	if (!name || !email){
		return (
			res.status(400).json({
				success: false,
				message: "Name and email are required"
			}))
		}


	try {
		insertQuery = `
			INSERT INTO users (name, email)
			VALUES ($1, $2)
			RETURNING *;
		`
		const values = [name, email]
		const result = await pool.query(insertQuery, values)

		res.status(201).json({
			success: true,
			message: "User created Successfully",
			data: result.rows[0]
		})
	
	} catch (error) {
		console.log("Error inserting user", error.message)
		res.status(500).json({
			success: false,
			message: "DB error during insert"
		})
	}

}

module.exports = { getUsers, createUser }