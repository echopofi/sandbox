const express = require("express")
const app = express()
const PORT = 3000
app.use(express.json())

const fetchUsers = async () => {
	const result = await fetch("https://jsonplaceholder.typicode.com/users")
	const data = await result.json()
	return data
}

app.get("/", async (req, res) => {
	try {
	const data = await fetchUsers()
		res.status(200).json(data)
	} catch (error) {
		res.status(500).json({
			message: "fetch failed"
		})
	}
})


app.listen(PORT, () => {
	console.log({
		message: "server active",
		port: 3000
	})
})
