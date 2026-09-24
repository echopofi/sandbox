const express = require("express")
const app = express()
const PORT = 3009
app.use(express.json())

const fetchData  = async(id="") =>{
	const url = id
	? `https://jsonplaceholder.typicode.com/users/${id}`
	: "https://jsonplaceholder.typicode.com/users"

	const result = await fetch(url)

	if (!result.ok){
		throw new Error("Result not ok")
	}

	const data = await result.json()

	return data
}

function errorMessage(res){
	return res.status(500).json({
		status: false,
		message: "An error occured"
	})
}

app.get("/", (req, res) =>{
	res.status(200).json({
		status: true,
		message:"welcome to my API page"
	})
})


app.get("/users", async(req, res) =>{
	try {
		const data = await fetchData()
		res.status(200).json(data)
	} catch (error) {erroeMessage(res)}
       
})


app.get("/users/:id", async(req, res) =>{
        try {
		const idn = req.params.id
                const data = await fetchData(idn)
                res.status(200).json(data)
        } catch (error) {erroeMessage(res)}

})



app.listen(PORT, ()=>{
	console.log({
		status: true,
		message: "Server running",
		port: PORT
	})
})
