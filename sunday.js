const engine = require("express")
const app = engine()
const PORT = 3044
app.use(engine.json())


const dataFetch = async(id = "") => {
	const url = id 
	? `https://jsonplaceholder.typicode.com/users/${id}`
	: "https://jsonplaceholder.typicode.com/users"

	const result = await fetch(url)
	const data = await result.json()

	if (!result.ok) {
		throw new Error({
			status: false,
			message: "Internal issue"
		})
	}

	return data
}

function errMsg(res) {
	return res.status(500).json({
		status: false,
		message: "fetching failed"
	})
}

app.get("/",
	(req, res) => {
		res.status(200).json({
			status: true,
			messgage: "Hello, ",
		})
	})

app.get("/users", async(req, res) => {
	try {
		const data = await dataFetch()
		res.status(200).json(data)
	} catch (error) {errMsg(res)}
}) 

app.listen(PORT, () => {
	console.log({
		status: true,
		message: "Server running",
		port: PORT
	})
})