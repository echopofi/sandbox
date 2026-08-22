const express = require("express")
const app = express()
const PORT = 3000

app.use(express.json())

app.get("/", (req, res) =>{
	res.status(200).json({ message: "Welcome to my fetching API" })
})

app.get("/externalJson", async(req, res) => {
	try {
		const result = await fetch("https://jsonplaceholder.typicode.com/users")
		const data = await result.json()

		res.status(200).json(data)
	} catch (error) {
			res.status(500).json({
				messgae: "Faied to fetch",
				status: false
			})

	}

})

app.listen(PORT, () =>{
	console.log({
		message: "Server healthy",
		status: "Active",
		port: 3000,
	})
})
