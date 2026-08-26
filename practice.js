const express = require("express")
const app = express()
const PORT = 3002

app.use(express.json())
const fetchData = async( id = "" ) => {
	const url = id 
	? `https://jsonplaceholder.typicode.com/users/${id}`
	: "https://jsonplaceholder.typicode.com/users"
	const result = await fetch(url)
	const data = await result.json()

	return data
}

app.get("/users/:id",async (req, res) => {
	try {
		const idNumber = req.params.id
		if (idNumber){

			const data = await fetchData(idNumber)
			return res.status(200).json(data)
		}
		const data = await fetchData()
		res.status(200).json(data)

	} catch (error) {
		res.status(500).json({
			message: "failed to fetch",
			status: false
		})
	}
})


app.get("/users", async(req, res) => {
	try {
		const data = await fetchData()
		res.status(200).json(data)
	} catch (error) {
		res.status(500).json({
			message: "failedto fetch",
			status: false
		})
	}
})

app.listen(PORT, () => {
	console.log({
		messgage: "server up",
		port: `${PORT}`,
		status:"healthy",
	})
})
