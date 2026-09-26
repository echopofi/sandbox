const express = require("express")
const app = express()
const port = 3022
app.use(express.json())

const users = [
	{
		id: 1, 
		name: "Don",
		email: "don@mail.com"
	}
]

app.get("/", (req, res) => {
	res.status(200).json({
		status: true,
		message: "Hello User"
	})
})

app.post("/users", (req, res) => {
	const { name, email } = req.body

	if (!name || !email){
		return(
			res.status(401).json({
				status: false,
				message: "name and email required"
			})
		)}
	

	const newUser = {
		id: users.length + 1,
		name,
		email
	}

	users.push(newUser)

	res.status(201).json({
		status: true,
		message: "User created successfully",
		data: newUser
	})
})

app.get("/users", (req, res) => {
	res.status(200).json(users)
})


app.listen(port, () =>{
	console.log({
		status: true,
		message: "Server running",
		port: port
	})
})