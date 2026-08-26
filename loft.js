const express = require("express")
const app = express()
const PORT = 3000
app.use(express.json())

const fetchData = async(id = "") => {
	const url = id?
		`https://jsonplaceholder.typicode.com/users/${id}`
		: "https://jsonplaceholder.typicode.com/users"
	const result = await fetch(url)

	if (!result.ok) {
		throw new Error("fetch failed")
	}

	const data = await result.json()

	return data
}


function errMessage(res) {
	return res.status(500).json({
		message: "failed to fetch",
		status: false
	})
}

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to my revision API"
    })
})


app.get("/users", async(req, res) => {
	try {
		const data = await fetchData()
		res.status(200).json(data)
	} catch (error) {
		errMessage(res)
	}
})

app.get("/users/:id", async(req, res) => {
	const idNumber = req.params.id

	try {
		const data = await fetchData(idNumber)
		res.status(200).json(data)
	} catch (error) { errMessage(res) }
	
})



app.listen(PORT, () => {
	console.log({
		message: "Server Running",
		port: `${PORT}`
	})
})
