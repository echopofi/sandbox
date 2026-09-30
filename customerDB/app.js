const express = require("express")
const app = express()
const port = 3022

app.use(express.json())


app.get("/", (req, res) => {
	res.status(200).json({
		status: true,
		message: "Welcome to my API",
	})
})

app.post("/users", (req, res) => {
	const { name, email } = req.body
	

})

app.listen(port, ()=>{
	console.log({
		status: true,
		message: "Server running",
		port: port
	})
})