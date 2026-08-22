const express = require("express")
const app = express()
const PORT = 3000
app.use(express.json())

app.get("/users", async (req, res)=>{
	try{
		const result = await fetch("https://jsonplaceholder.typicode.com/users")
		const data = await result.json()

		res.status(200).json(data)
	} catch (error) {
		res.status(500).json({
			message: "fetching failed",
			status: false,
		})
	}
})

app.get("/users/:id", async(req, res) => {
	try {
		const id = req.params.id
		const result = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
		const data = await result.json()
		res.status(200).json(data)
	} catch (error) {
		res.status(500).json({
			message: "fetching failed, server error",
			status: false
		})
	}
})

app.listen(PORT, () =>{
	console.log({
		message: "server running",
		port: 3000,
		health: "healthy"
	})
})
