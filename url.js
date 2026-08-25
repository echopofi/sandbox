const express = require("express")
const app = express()
const PORT = 3000

app.use(express.json())

const fetchData = async(id = "")=>{
	const url = id
		? `https://jsonplaceholder.typicode.com/users/${id}`
		: "https://jsonplaceholder.typicode.com/users"
	
	const result = await fetch(url)
	const data = await result.json()

	return data
}

app.get("/", (req, res) => {
	res.status(200).json({
		message: "Welcome to my optimized API"
	})
})

app.get("/users/:id", async(req, res) => {
	try {
		const idNumber = req.params.id

		const data = await fetchData(idNumber)
		res.status(200).json(data)
	} catch (error) {
		res.status(500).json({
			message: "Failed to fetch",
			status: false
		})
	}
})


app.listen(PORT, () => {
	console.log({
		message: "Server up",
		port: `${PORT}`,
		fileName: "url.js"
	})
})
