const express = require("express")
const app  = express()
const PORT = 3022

const fetchData = async(id = "") => {
	const exAPI = id?
		`https://jsonplaceholder.typicode.com/users/${id}`
		: "https://jsonplaceholder.typicode.com/users"

	const result = await fetch(exAPI)
	
	if (!result.ok){
		throw new Error({
			message: "fetching failed"
		})
	}

	const data = await result.json()

	return data
}

function errMessage(res){
	return res.status(500).json({
		message: "Fetching failed",
		status: false
	})
}

app.use(express.json())


app.get("/", (req, res) => {
	res.status(200).json({
		message: "Welcome to my toy o :)"
	})
})

app.get("/users", async(req, res) => {
	try {
		const data = await fetchData()

		res.status(200).json(data)
	} catch (error) {errMessage(res)}
})

app.get("/users/:id", async(req, res) => {
	try {
		const idNumber = req.params.id
		const data = await fetchData(idNumber)
		res.status(200).json(data)
	} catch (error) {errMessage(res)}
})

app.listen(PORT, () => {
	console.log({
		message: "server up",
		port: `${PORT}`
	})
})
