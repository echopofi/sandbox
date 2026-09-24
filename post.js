const express = require("express")
const app = express()
const port = 3011
app.use(express.json())

const db = [
	{id: 1, name: "Tester One", email: "tester1@example.com"},
	{id: 2, name: "Funky Two", email: "funcky2@example.com"}
]

app.get("/", (req, res) => {
	res.status(200).json({
		status: true,
		message: "Welcome"
	})
})

app.get("/users", (req, res) => {
	res.status(200).json({
		status: true,
		data: db
	})
})

app.post("/users", (req, res) => {
	const { name, email } = req.body

	if ( !name || !email ) {
		return(
			res.status(400).json({
				status: false,
				message: "Name and email required"
			}))
	}

	const newUser = { id: db.length +1, name, email}

	db.push(newUser)

	res.status(201).json({
		status: true,
		message: "User added successfully",
		data: newUser
	})

	console.log(db)
})



app.listen(port, () => {
	console.log({
		status: true,
		message: "Server running",
		port: port
	})
})