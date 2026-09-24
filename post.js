const express = require("express")
const app = express()
const port = 3010

app.use(express.json())

let users = [
    { id: 1, name: "Alice", email: "alice@test.com" },
    { id: 2, name: "Bob", email: "bob@test.com" }
]

app.get("/", (req, res) => {
	res.status(200).json({
		status: true,
		message: "Welcome"
	})
})

app.get("/users", (req, res) => {
	res.status(200).json({
		status:true,
		data: users
	})
})

app.post("/users", (req, res) => {
	const { name, email } = req.body

	if (!name || !email){
		return(
			res.status(400).json({
				status: false,
				message: "name and email required"
			}))
	}

	const newUser = { id: users.length + 1, name, email }

	users.push(newUser)
	console.log(users)

	res.status(201).json({
		status: true,
		message: "User created success",
		data: newUser
	})
})


app.listen(port, ()=>{
	console.log({
		status: true,
		message: "Server running",
		port: port
	})
})