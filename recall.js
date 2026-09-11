const express = require("express")
const app = express()
const PORT = 3044

app.use(express.json())

const dataFetch = async(id = "") => {
	const url = id
	? `https://jsonplaceholder.typicode.com/users/${id}`
	: "https://jsonplaceholder.typicode.com/users"

	const result = await fetch(url)

	if (!result.ok) {
		throw new Error("url not ok")
	}

	const data = await result.json()

	return data
}

function errorMessage(res){
	return res.status(500).json({
		status: false,
		message: "Internal error"
	})
}

app.get("/", (req, res) => {
	res.status(200).json({
		status: true,
		message: "Welcome to my API"
	})
})

app.get("/users", async(req, res) => {
	try {
		const data = await dataFetch()
		res.status(200).json(data)
	} catch (error) {errorMessage(res)}
})

app.get("/users/:id", async(req, res) => {
	try {
		const idn = req.params.id
		const data = await dataFetch(idn)
		res.status(200).json(data)
	} catch (error) {errorMessage(res)}
})

app.listen(PORT, () => {
	console.log({
		status: true,
		message: "Server active",
		port: PORT
	})
})