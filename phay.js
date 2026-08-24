const express = require("express")
const app = express()
const PORT = 3003
app.use(express.json())

const fetchUsers = async() => {
	const id = req.query.id
	const result = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
	const data = await result.json()

	return data
}


app.get("/", (req, res) => {
	res.status(200).json({
		message: "Welcome to my test API"
	})
})

app.get("/customers/?id", async(req, res) => {
	try {
		const allCustomers = await fetchUsers()
		res.status(200).json(allCustomers)
	} catch (error) {
		res.status(500).json({
			message: "fetching failed",
			status: false
		})
	}
})

app.listen(PORT, () => {
	console.log({
		message: "server up",
		port: 3003
	})
})