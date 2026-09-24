const express = require("express")
const app = express()
const port = 3010

app.use(express.json())

app.get("/", (req, res) => {
	res.status(200).json({
		status: true,
		message: "Welcome"
	})
})

app.post("/users", (req, res) => {
	const { name, email } = req.body

	if(!name || !email){
		return (
			res.status(400).json({
				status: false,
				message: "Input error"
			}))
	}

	const newUser = {
		id: Date.now(), name, email	
	}

	res.status(201).json({
		status: true,
		message: "User created successfully",
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