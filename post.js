const express = require("express")
const app = express()
const port = 3020
app.use(express.json())

const users = [
	{
		id: 1,
		name: "Rhoda",
		email: "rhoda@mail.com"
	}
]

app.get("/", (req, res)=> {
	res.status(200).json({
		status: true,
		message: "Welcome"
	})
})


app.get("/users", (req, res)=> {
	res.status(200).json(users)
})

app.post("/users", (req, res)=> {
	const {  name, email } = req.body

	if (!name || !email){
		return(
			res.status(400).json({
				status: false,
				message: "Name and user name needed"
			}))
	}

	const emailExist = users.find(user => user.email === email)

	if (emailExist) {
		return(
			res.status(401).json({
				status: false,
				message: "Something went wrong"
			}))
	}
	const newUser = {
		id: users.length + 1,
		name,
		email
	}
	users.push(newUser)

	res.status(201).json({
		status: true,
		message: "New user created Sucdessfully",
		data: newUser
	})

	console.log(users)
})



app.listen(port, ()=>{
	console.log({
		status: 200,
		message: "Server running",
		port: port
	})
})