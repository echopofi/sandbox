const express = require("express")
const app = express()
const PORT = 3001


app.use(express.json())

const fetchUsers = async () => {
	const result = await fetch("https://jsonplaceholder.typicode.com/users")
	const data = await result.json()

	return data
}

app.get("/", async (req, res) => {
	try {
		const result = await fetchUsers()
		//const data = await result.json()
		res.status(200).json(result)	
	} catch (error) {
		res.status(500).json({
			message: "fetching error",
			status: false
		})
	}
	
})




app.listen(PORT, () => {
	console.log({
		message: "server running",
		port: 3001,
		status: "healthy"
	})
})