const express = require("express")
const app = express()
const PORT = 3001
app.use(express.json())

app.get("/", (req, res) =>{
	res.status(200).json({message: "API active"})
})

app.get("/users", async(req, res) => {
	try {
		const result = await fetch("https://jsonplaceholder.typicode.com/users")
		const data = await result.json()

		res.status(200).json(data)
	} catch (error){
		res.status(500).json({
			message: "fetching error",
			status: false
		})
	}
})

app.get("/userId/:id", async(req, res) =>{
	try{
		const id = req.params.id
		const result = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
		const data = await result.json()

		res.status(200).json(data)
	} catch (error){
		res.status(500).json({
			message: "faied to fetch",
			status: false
		})
	}
})

app.listen(PORT, ()=>{
	console.log({
		message: "Server Runnig",
		health: "healthy",
		status: true,
		port: 3001
	})
})