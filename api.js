const express = require("express")
const app = express()
const PORT = 3054

app.use(express.json())

const dataFetch = async(id = "") => {
	url = id
	? `https://jsonplaceholder.typicode.com/users/${id}`
	: "https://jsonplaceholder.typicode.com/users"

	const result = await fetch(url)
	const data = result.json()
	
	if (!result.ok){
		throw new Error("Result not ok")
	}


	return data
}

function errorMessage(res) {
	return res.status(200).json({
		status: 500,
		message: "Fetching failed"
	})
}


app.get("/", (req, res) => {
	res.status(200).json({
		status: true,
		message: "welcome to my api"
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
		message: "server running",
		port: PORT
	})
})
