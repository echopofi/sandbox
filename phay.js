const express = require("express")
const app = express()
const PORT = 3000

app.use(express.json())

const fetchData = async() => {
	const result = await fetch("https://jsonplaceholder.typicode.com/users")
	const data = await result.json()

	return data
}

app.get("/", (req, res) => {
	res.status(200).json({
		message: "Welcome to my revision API"
	})
})

app.get("/users", async(req, res)=>{
	try {
		const data = await fetchData()
		res.status(200).json(data)
	} catch (error) {
		res.status(500).json({
			message: "Unable to fetch",
			status: false,
		})
	}
})

app.listen(PORT, () => {
	console.log({
		message: "server running",
		port: PORT,
		status: true
	})
})

