const express = require("express")
const app = express()
const PORT = 3044
app.use(express.json())
const fetchData = async(id = "") => {
	const url = id
	? `https://jsonplaceholder.typicode.com/users/${id}`
	: "https://jsonplaceholder.typicode.com/users/"

	const result = await fetch(url)
	//const data = await result.json()
	if (!result.ok) {
		throw new Error("Result not ok, check URL")
	}

	const data = await result.json()

	return data
}

function errorMessage (res){
	return res.status(500).json({
		status: false,
		message: "Internal error"
	})
}


app.get("/", (req, res) => {
	res.status(200).json({
		status: true,
		message: "Hello, welcome to my API"
	})
})

app.get("/users", async(req, res) => {
	try {
		const data = await fetchData()
		res.status(200).json(data)
	} catch (error) {errorMessage(res)}
})

app.get("/users/:id", async(req, res) => {
        try {
		const idn = req.params.id
                const data = await fetchData(idn)
                res.status(200).json(data)
        } catch (error) {errorMessage(res)}
})


app.listen(PORT, () => {
    console.log({
	    status: true,
	    message: "Server running",
	    port: PORT
    })
})
