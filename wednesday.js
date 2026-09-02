const express = require("express")
const app = express()
const PORT = 3055

app.use(express.json())

const fetchData = async(id = "")=> {
	const url = id
	? `https://jsonplaceholder.typicode.com/users/${id}`
	: "https://jsonplaceholder.typicode.com/users"

	const result = await fetch(url)
	const data = await result.json()
	
	if (!result.ok) {
		res.status(500).json({
			status: false,
			message: "result not ok"
		})
	}

	return data
}

function errMsg(res){
	return 	res.status(500).json({
		status: true,
		message: "fetching failed",
	})
}


app.get("/", (req, res) => {
	res.status(200).json({
		status: true,
		message: "welcome, hello"
	})
})

app.get("/users", async(req, res) => {
	try{
		const data = await fetchData()
		res.status(200).json(data)
	} catch (error) {errMsg(res)}
})

app.get("/users/:id", async(req, res) => {
	try {
		const idn = req.params.id
		const data = await fetchData(idn)
		res.status(200).json(data)

	} catch (error) {errMsg(res)}
})

app.listen(PORT, () => {
	console.log({
		status: true,
		message: "Server up",
		port: PORT
	})
})
