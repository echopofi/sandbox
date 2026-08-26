const express = require("express")
const app = express()
const PORT = 3000

app.use(express.json())

const fetchData = async(id = "") => {
	const url = id? 
	 `https://jsonplaceholder.typicode.com/users/${id}`
	: "https://jsonplaceholder.typicode.com/users"

	const result = await fetch(url)
	const data = await result.json()
	return data
}

app.get("/users", async(req, res) => {
	try {
		const data = await fetchData()
		res.status(200).json(data)
	} catch (error) {
		res.status(500).json({message: "Failed to fetch",  status: false})
	}
})

app.get("/users/:id", async(req, res) => {
	try {
		const id = req.params.id
		const data = await fetchData(id)
		res.status(200).json(data)
	} catch (error) {
		res.status(500).json({
			message: "fetch failed",
			status: false
		})
	}
})

app.listen(PORT, () => {
	console.log({
		message: "server up",
		port: `${PORT}`
	})
})