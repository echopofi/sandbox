const express = require("express")
const app = express()
const PORT = 3009
app.use(express.json())

const dataFetch = async(id = "") => {
	const url = id
	? `https://jsonplaceholder.typicode.com/users/${id}`
	: "https://jsonplaceholder.typicode.com/users"

	const result = await fetch(url)
	const data = await result.json()

	return data
}
function errorMessage(res){
	res.status(500).json({
		status: false,
		message: "Inernal server error"
	})
}

app.get("/", (req, res) => {
	res.status(200).json({
		status: true,
		message: "Welcome"
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




app.listen(PORT, ()=>{
	console.log({
		status: true,
		message: "Server running",
		port: PORT
	})
})
