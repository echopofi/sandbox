const express = require("express")
const app = express()
const PORT = 3000
app.use(express.json())

app.get("/", (req, res) =>{
	res.json({messgae: "Welcome to my fetch API"})
})

app.get("/externalUsers", 
	async(req, res) =>{
		const result = await fetch("https://jsonplaceholder.typicode.com/users")
		const data = await result.json()

		res.status(200).json(data)
})

app.listen(PORT, () =>{
	console.log({
		message: "Server Runnig",
		port: 3000,
		isHealthy: true})
})